const express = require("express");
const user = require("./user");
const products = require("./products");

const router = express.Router();

router.use("/user", user);
router.use("/products", products);

module.exports = router;