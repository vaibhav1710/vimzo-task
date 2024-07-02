const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const blogController = require("../controllers/BlogController");
const multer = require("multer");
const storage = require("../cloudinary");
const upload = multer(storage);

const blogRoutes = () => {
  router.get("/blog", blogController.getBlogs);
  router.get("/blog/:id", blogController.getBlogbyId);
  router.post("/blog", auth, upload.single("image"), blogController.createBlog);
  router.delete("/blog/:id", auth, blogController.deleteBlog);
  router.put("/blog/:id", auth, blogController.updateBlog);
  router.get("/search/blog", blogController.getFilteredPost);
  return router;
};

module.exports = blogRoutes;
