const express = require("express");
const { status, } = require("http-status");
const adminAuthenticate = require("../../../../../../../../middlewares/v1/adminAuthenticate");
const db = require("../../../../../../../../models/v1/index");
const { message500 } = require("../../../../../../../../utils/httpResponses");

const router = express.Router();

router.get("/", adminAuthenticate, async (req, res) => {
  const result = await db.sequelize.models.user.getAdminGuestUsersCountStat();
  if (false === result) {
    res.status(status.UNAUTHORIZED);
    return res.json(message500);
  }
  
  res.status(status.OK);
  return res.json({ data: result.count });
});

module.exports = router;