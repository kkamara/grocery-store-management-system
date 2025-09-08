const express = require("express");
const userAddresses = require("./userAddresses");

const router = express.Router();

router.use("/", userAddresses);

module.exports = router;