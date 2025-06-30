'use strict';
const express = require('express');
const users = require("./users");
const user = require("./user");
const admin = require("./admin");
const stats = require("./stats");

const router = express.Router();

router.use("/users", users);
router.use("/user", user);
router.use("/admin", admin);
router.use("/stats", stats);

module.exports = router;