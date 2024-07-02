const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

const userRoutes = () => {
  router.post("/", userController.register);
  router.post("/login", userController.login);
  return router;
};

module.exports = userRoutes;
