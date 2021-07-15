import { Router } from "express";
const noteRoute = require('./note')
const router = Router();

router.use('/note',noteRoute);

module.exports = router;