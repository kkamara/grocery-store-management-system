const express = require("express");
const products = require("./products");
const product = require("./product");

const router = express.Router();

router.use("/", products);
router.use("/:productSlug", product);

module.exports = router;