const { databaseConnection } =  require("./database.js")
const { start } = require("./server.js");
const express =  require('express');
const app = express();

const init = async()=>{
    await databaseConnection();
    return await start(app);
}

init();