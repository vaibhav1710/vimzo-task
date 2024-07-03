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
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or Username is already registered" });
    }
    const user = await User.create({ email, username, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
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
