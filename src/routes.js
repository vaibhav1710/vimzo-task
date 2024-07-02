const userRoutes = require("./route/User");
const blogRoutes = require("./route/Blog");
const BASE_PATH = "";

const appRoutes = (app) => {
  app.use(BASE_PATH, userRoutes());
  app.use(BASE_PATH, blogRoutes());
};

module.exports = appRoutes;
