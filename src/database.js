const mongoose =  require('mongoose');
const config = require('./config');


const databaseConnection = async ()=>{
    try {
        await mongoose.connect(`${config.DATABASE_URL}`);
        console.log('successfully connected to database');
    } catch (error) {
        console.log('Database Connection error');
    }
}

module.exports =  {databaseConnection}