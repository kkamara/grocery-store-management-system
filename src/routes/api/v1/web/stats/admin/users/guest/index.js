const express = require("express");
const guest = require("./guest");

const router = express.Router();

router.use("/", guest);

module.exports = router;