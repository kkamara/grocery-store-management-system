const express = require("express");
const { status, } = require("http-status");
const authenticate = require("../../../../../middlewares/v1/authenticate");
const db = require("../../../../../models/v1");
const { message500 } = require("../../../../../utils/httpResponses");

const router = express.Router();

router.get(
  "/",
  authenticate,
  async (req, res) => {
    const userAddresses = await db.sequelize.models
      .userAddress
      .getUserAddressesByUserId(
        req.session.userId
      );
    if (false === userAddresses) {
      res.status(status.INTERNAL_SERVER_ERROR);
      return res.json({ error: message500 });
    }
    return res.json({ data: userAddresses });
  },
);

module.exports = router;