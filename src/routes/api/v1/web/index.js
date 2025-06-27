'use strict';
const express = require('express');
const users = require("./users");
const user = require("./user");
const admin = require("./admin");

const router = express.Router();

router.use("/users", users);
router.use("/user", user);
router.use("/admin", admin);

module.exports = router;