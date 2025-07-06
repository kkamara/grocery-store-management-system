const express = require("express");
const moment = require("moment-timezone");
const db = require("../../../../../../../models/v1");

const router = express.Router();

router.get("/", async (req, res) => {
  const past3MonthEarnings = await db.sequelize
    .models
    .order
    .getPast3MonthEarnings();
  return res.json({ data: past3MonthEarnings });
});

module.exports = router;