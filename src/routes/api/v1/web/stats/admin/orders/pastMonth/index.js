const express = require("express");
const pastMonth = require("./pastMonth");

const router = express.Router();

router.use("/", pastMonth);

module.exports = router;