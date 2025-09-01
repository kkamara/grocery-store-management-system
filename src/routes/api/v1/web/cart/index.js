const express = require("express");
const cart = require("./cart");

const router = express.Router();

router.use("/", cart);

module.exports = router;