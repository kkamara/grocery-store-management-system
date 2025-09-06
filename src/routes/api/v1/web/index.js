'use strict';
const express = require('express');
const user = require("./user");
const admin = require("./admin");
const stats = require("./stats");
const charts = require("./charts");
const products = require("./products");
const cart = require("./cart");
const checkout = require("./checkout");

const router = express.Router();

router.use("/user", user);
router.use("/admin", admin);
router.use("/stats", stats);
router.use("/charts", charts);
router.use("/products", products);
router.use("/cart", cart);
router.use("/checkout", checkout);

module.exports = router;