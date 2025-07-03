const express = require("express");
const products = require("./products");
const orders = require("./orders");
const shipments = require("./shipments");
const users = require("./users");

const router = express.Router();

router.use("/products", products);
router.use("/orders", orders);
router.use("/shipments", shipments);
router.use("/users", users);

module.exports = router;