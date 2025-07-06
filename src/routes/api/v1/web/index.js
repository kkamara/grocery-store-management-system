'use strict';
const express = require('express');
const users = require("./users");
const user = require("./user");
const admin = require("./admin");
const stats = require("./stats");
const charts = require("./charts");

const router = express.Router();

router.use("/users", users);
router.use("/user", user);
router.use("/admin", admin);
router.use("/stats", stats);
router.use("/charts", charts);

module.exports = router;