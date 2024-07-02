const dotenv =  require('dotenv');

dotenv.config();

class Config {
    constructor() {
         this.SECRET = process.env.SECRET || '';
         this.CLOUD_NAME = process.env.CLOUD_NAME || '';
         this.DATABASE_URL = process.env.DATABASE_URL || '';
         this.API_SECRET = process.env.API_SECRET || '';
         this.API_KEY = process.env.API_KEY
    }}

const config = new Config();
module.exports =  config;