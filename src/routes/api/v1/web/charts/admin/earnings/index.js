const express = require("express");
const earnings = require("./earnings");

const router = express.Router();

router.use("/", earnings);

module.exports = router;