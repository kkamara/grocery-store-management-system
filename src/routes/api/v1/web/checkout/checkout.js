const express = require("express");
const { status } = require("http-status");
const moment = require("moment-timezone");
const db = require("../../../../../models/v1");
const authenticate = require("../../../../../middlewares/v1/authenticate");
const { message404 } = require("../../../../../utils/httpResponses");

const router = express.Router();

router.get(
  "/:billingReference",
  authenticate,
  async (req, res) => {
    const order = await db.sequelize.models
      .order
      .getOrderByBillingReference(
        req.paramString("billingReference"),
        {
          getShipping: true,
          getUserAddress: true,
          getUser: true,
        },
      );
    if (false === order) {
      res.status(status.NOT_FOUND);
      return res.json({ error: message404 });
    }

    const userOwnsOrder = order.usersId === req.session.userId;
    if (false === userOwnsOrder) {
      res.status(status.NOT_FOUND);
      return res.json({ error: "You have not made this order." });
    }

    const orderTimestamp = moment(
      order.createdAt
    )
      .utc()
      .unix();
    const thirtyMinutesAgoTimestamp = moment()
      .utc()
      .subtract(
        30, "minutes"
      )
      .unix();
    if (orderTimestamp < thirtyMinutesAgoTimestamp) {
      res.status(status.NOT_FOUND);
      return res.json({ error: message404 });
    }

    return res.json({ data: order })
  },
);

module.exports = router;