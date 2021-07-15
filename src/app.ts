import express from "express";
import { json } from "body-parser";
import { DbConnect } from "./db/db";
import { Config } from "./config/config";
const logger = require('morgan');
const routes = require('./routes/index');

let _config = new Config().get(process.env.NODE_ENV || 'dev');
const app = express();
new DbConnect().startUp();

// set up middleware
app.use(logger(_config.env));
app.use(json());
app.use(express.urlencoded({ extended: false }));

//routes path
app.use('/api/', routes);
app.use('/**', (req, res) => {
    res.status(404).json({ message: "not found", data: {} });
});

//run app
app.listen(_config.port, () => console.log(`Listen to port: ${_config.port}`));
