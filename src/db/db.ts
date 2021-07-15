import { Config } from "../config/config";

const mongoose = require('mongoose');
let _config = new Config().get(process.env.NODE_ENV || 'dev');

export class DbConnect {
    constructor() { }
    startUp = async () => {
        try {
            let url = `mongodb://${_config.db.host}:${_config.db.port}/${_config.db.name}`;
            console.log(url)
            await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            console.log(`Connected to: ${_config.db.host}:${_config.db.name}`)
        } catch (error) {
            console.log(error)
        }
    }
}