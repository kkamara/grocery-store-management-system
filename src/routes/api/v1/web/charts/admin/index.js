const express = require("express");
const earnings = require("./earnings");
const orders = require("./orders");

const router = express.Router();

router.use("/earnings", earnings);
router.use("/orders", orders);

module.exports = router;