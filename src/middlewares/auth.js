require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  // check whether a token exist
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = requireAuth;
