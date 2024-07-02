require("dotenv").config();
const User = require("../models/User");
const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const client = require("../redisClient");

module.exports.getBlogs = async (req, res) => {
  try {
    const cacheBlogs = await client.get("blogs");
    if (cacheBlogs) {
      return res.status(200).json(JSON.parse(cacheBlogs));
    }

    // If not in cache, fetch from the database
    const blogs = await Blog.find().populate("author", "username email");

    // Store the blogs list in Redis cache
    await client.set("blogs", JSON.stringify(blogs), {
      EX: 60 * 60, // Cache expiration time in seconds (e.g., 1 hour)
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "An error occurred while fetching blogs" });
  }
};

module.exports.getBlogbyId = async (req, res) => {
  try {
    const { id: blogId } = req.params;

    const cacheBlog = await client.get(`blog:${blogId}`);
    if (cacheBlog) {
      return res.status(200).json(JSON.parse(cacheBlog));
    }

    const blog = await Blog.findById(blogId).populate(
      "author",
      "username email"
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    await client.set(`blog:${blogId}`, JSON.stringify(blog), {
      EX: 60 * 60,
    });

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the blog post" });
  }
};

module.exports.createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    let imageUrl = "";
    console.log(req.file);
    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.SECRET);
    const { id } = decoded;
    const blog = await Blog.create({
      title: title,
      content: content,
      author: id,
      image: imageUrl,
    });

    const populatedBlog = await blog.populate("author", "username email");
    console.log(populatedBlog);
    await client.set(
      `blog:${populatedBlog._id}`,
      JSON.stringify(populatedBlog),
      {
        EX: 60 * 60,
      }
    );

    await client.del("blogs");
    res.status(201).json(populatedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports.updateBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const { title, content, image } = req.body;
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    if (!blog.author.equals(userId)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this blog post" });
    }

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (image) blog.image = image;

    const updatedBlog = await blog.save();

    const populatedUpdatedBlog = await updatedBlog.populate(
      "author",
      "username email"
    );

    // Store the updated blog in Redis with its ID as the key
    await client.set(`blog:${blogId}`, JSON.stringify(populatedUpdatedBlog), {
      EX: 60 * 60, // Cache expiration time in seconds (e.g., 1 hour)
    });

    // Clear cache for the blogs list to ensure the list is updated
    await client.del("blogs");

    res.status(200).json(populatedUpdatedBlog);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the blog post" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    if (!blog.author.equals(userId)) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this blog post" });
    }

    await Blog.findByIdAndDelete(blogId);

    // Remove the blog from Redis cache
    await client.del(`blog:${blogId}`);

    // Clear cache for the blogs list to ensure it is updated
    await client.del("blogs");

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the blog post" });
  }
};

module.exports.getFilteredPost = async (req, res) => {
  const { qtitle, qauthor } = req.query;

  try {
    let query = {};
    if (qtitle) {
      query["title"] = { $regex: qtitle, $options: "i" };
    }

    let authorQuery = {};

    if (qauthor) {
      authorQuery["username"] = { $regex: qauthor, $options: "i" };
    }

    const authors = await User.find(authorQuery).select("_id");

    if (authors.length > 0) {
      query["author"] = { $in: authors.map((author) => author._id) };
    }

    const blogs = await Blog.find(query)
      .populate({
        path: "author",
        match: qauthor ? { username: { $regex: qauthor, $options: "i" } } : {}, // Only apply match if qauthor is provided
      })
      .exec();

    const filteredBlogs = blogs.filter((blog) => blog.author !== null);

    res.status(200).json(filteredBlogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
