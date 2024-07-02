const http = require("http");
//require('express-async-errors');
const config = require("./config.js");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const appRoutes = require("./routes.js");
const cookieParser = require("cookie-parser");

function standardMiddleware(app) {
  app.use(bodyParser.json({ limit: "200mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
  app.use(cookieParser());
}

function routesMiddleware(app) {
  appRoutes(app);
}


function startHttpServer(httpServer) {
  try {
    const SERVER_PORT = 3000;
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Server is listening on ${SERVER_PORT}`);
    });
  } catch (err) {
    console.log("error", "error in startHttpServer(): ", err);
  }
}

function startServer(app) {
  try {
    const httpServer = new http.Server(app);
    startHttpServer(httpServer);
  } catch (err) {
    console.log("error", "error in startServer(): ", err);
  }
}

async function start(app) {
  standardMiddleware(app);
  routesMiddleware(app);
  startServer(app);
}

module.exports = { start };
