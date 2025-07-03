const express = require("express");
const pastMonth = require("./pastMonth/index");

const router = express.Router();

router.use("/past-month", pastMonth);

module.exports = router;