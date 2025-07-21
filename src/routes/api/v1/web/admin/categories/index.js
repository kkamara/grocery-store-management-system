const express = require("express");
const categories = require("./categories");

const router = express.Router();

router.use("/", categories);

module.exports = router;