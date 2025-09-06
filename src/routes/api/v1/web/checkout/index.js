const express = require("express");
const checkout = require("./checkout");

const router = express.Router();

router.use("/", checkout);

module.exports = router;