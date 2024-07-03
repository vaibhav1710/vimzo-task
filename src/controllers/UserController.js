require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 30 * 24 * 60 * 60; // 30 days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    // Check if a user with the provided email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or Username is already registered" });
    }

    // Create a new user in the database with the provided credentials
    const user = await User.create({ email, username, password });

     // Create a JWT token for the newly registered user
    const token = createToken(user._id);

    // Set the JWT token in a cookie with HTTPOnly flag and maxAge
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //// Attempt to login user using the provided username and password
    const user = await User.login(username, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
     // Generate a JWT token for the logged-in user
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    
    res.status(201).json({ message: "User loggedin successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(400).json({ error: "Invalid credentials" });
  }
};

module.exports.first = async (req, res) => {
  res.send("Hello World!!");
};
