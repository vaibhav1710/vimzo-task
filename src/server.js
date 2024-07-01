const http =  require('http');
//require('express-async-errors');
const config = require('./config.js');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
//const {appRoutes} = require('./routes.js');




function standardMiddleware(app) {
    app.use(bodyParser.json({ limit: '200mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));
}

function routesMiddleware(app) {
   // appRoutes(app);
}





// function errorHandler(app) {
//     app.use((err, req, res, next) => {
//         log.log('error', OrderService ${err.comingFrom}, err);
//         if (err instanceof CustomError) {
//             res.status(err.statusCode).json(err.serializeErrors());
//         }
//         next();
//     });
// }


function startHttpServer(httpServer) {
    try {
        const SERVER_PORT = 4006;
        httpServer.listen(SERVER_PORT, () => {
            console.log("order server is listening on ${SERVER_PORT}");
        });
    } catch (err) {
        console.log('error', 'error in startHttpServer(): ', err);

    }
}

function startServer(app) {
    try {
        const httpServer = new http.Server(app);
        startHttpServer(httpServer);
    } catch (err) {
        console.log('error', 'error in startServer(): ', err);
    }
}

async function start(app) {
    standardMiddleware(app);
    routesMiddleware(app);
   // errorHandler(app);
}


module.exports =  { start };