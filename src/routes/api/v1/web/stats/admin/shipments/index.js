const express = require("express");
const ongoing = require("./ongoing");

const router = express.Router();

router.use("/ongoing", ongoing);

module.exports = router;