const express = require("express");
const db = require("../../../../../../models/v1");
const { status, } = require("http-status");
const { message500, } = require("../../../../../../utils/httpResponses");
const adminAuthenticate = require("../../../../../../middlewares/v1/adminAuthenticate");

const router = express.Router();

router.get("/", adminAuthenticate, async (req, res) => {
  const manufacturers = await db.sequelize.models
    .manufacturer
    .getManufacturers();
  if (false === manufacturers) {
    res.status(status.INTERNAL_SERVER_ERROR)
    return res.json({
      error: message500,
    });
  }

  return res.json({ data: manufacturers });
});

module.exports = router;