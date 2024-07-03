const http = require("http");
//require('express-async-errors');
const config = require("./config.js");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const appRoutes = require("./routes.js");
const cookieParser = require("cookie-parser");

function standardMiddleware(app) {
  // Parse incoming request bodies as JSON with a size limit of 200MB
  app.use(bodyParser.json({ limit: "200mb" }));

  // Parse URL-encoded bodies and extended payloads with a size limit of 200MB
  app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));

  // Parse cookies attached to incoming requests
  app.use(cookieParser());
}

// Middleware function to attach application routes to the Express app
function routesMiddleware(app) {
  appRoutes(app);
}


// Function to start an HTTP server and listen on a specified port
function startHttpServer(httpServer) {
  try {
    // Define PORT on which server will listen
    const SERVER_PORT = 3000;
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Server is listening on ${SERVER_PORT}`);
    });
  } catch (err) {
    console.log("error", "error in startHttpServer(): ", err);
  }
}

// Function to create and start an HTTP server for the Express app
function startServer(app) {
  try {
    const httpServer = new http.Server(app);
    startHttpServer(httpServer);
  } catch (err) {
    console.log("error", "error in startServer(): ", err);
  }
}

// Asynchronous function to start the application
async function start(app) {
  
  // Set up standard middleware for the Express app
  standardMiddleware(app);

  // Attach application routes middleware to the Express app
  routesMiddleware(app);

  // Start the HTTP server for the Express app
  startServer(app);
}

module.exports = { start };
