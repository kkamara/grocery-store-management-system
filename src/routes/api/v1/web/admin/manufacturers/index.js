const express = require("express");
const manufacturers = require("./manufacturers");

const router = express.Router();

router.use("/", manufacturers);

module.exports = router;