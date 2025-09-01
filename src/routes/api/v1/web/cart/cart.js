const express = require("express");
const authenticate = require("../../../../../middlewares/v1/authenticate");
const db = require("../../../../../models/v1/index");

const router = express.Router();

router.get(
  "/",
  authenticate,
  async (req, res) => {
    const usersCart = await db.sequelize.models
      .cart
      .getCart(
        req.session.userId,
      );

    return res.json({ cart: usersCart });
  }
);

module.exports = router;