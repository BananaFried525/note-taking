import express from "express";
import { json } from "body-parser";
import { DbConnect } from "./db/db";
const logger = require('morgan');
const routes = require('./routes/index');
const app = express();

new DbConnect().startUp();
app.use(logger("dev"))
app.use(json())
app.use(express.urlencoded({ extended: false }));

app.use('/api/', routes);
app.use('/**', (req, res) => {
    res.status(404).json({ data: "not found" })
})
app.listen(8081, () => console.log(`localhost:8081`));
