const express = require("express");
const orders = require("./orders");

const router = express.Router();

router.use("/", orders);

module.exports = router;