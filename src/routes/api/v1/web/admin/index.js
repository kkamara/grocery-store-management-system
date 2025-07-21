const express = require("express");
const user = require("./user");
const products = require("./products");
const categories = require("./categories");
const manufacturers = require("./manufacturers");

const router = express.Router();

router.use("/user", user);
router.use("/products", products);
router.use("/categories", categories);
router.use("/manufacturers", manufacturers);

module.exports = router;