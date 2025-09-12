const express = require("express");
const { status, } = require("http-status");
const authenticate = require("../../../../../middlewares/v1/authenticate");
const db = require("../../../../../models/v1");
const { message500, message200, } = require("../../../../../utils/httpResponses");

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

router.post(
  "/new",
  authenticate,
  async (req, res) => {
    const inputError = await db.sequelize.models
      .userAddress
      .getNewUserAddressError(
        req.session.userId,
        req.body,
      );
    if (false !== inputError) {
      res.status(status.BAD_REQUEST);
      return res.json({ error: inputError });
    }
    
    const cleanData = db.sequelize.models
      .userAddress
      .getNewUserAddressData({
        addressLine1: req.bodyString("addressLine1"),
        addressLine2: req.bodyString("addressLine2"),
        zipCode: req.bodyString("zipCode"),
        city: req.bodyString("city"),
        state: req.bodyString("state"),
        telephoneAreaCode: req.bodyString("telephoneAreaCode"),
        telephone: req.bodyString("telephone"),
      });
    
    const newUserAddress = await db.sequelize
      .models
      .userAddress
      .newUserAddress(
        req.session.userId,
        cleanData,
      );
    if (false === newUserAddress) {
      res.status(status.INTERNAL_SERVER_ERROR);
      return res.json({ error: message500 });
    }
    
    return res.json({ message: message200 });
  },
);

router.delete(
  "/:userAddressId",
  authenticate,
  async (req, res) => {
    const inputError = await db.sequelize.models
      .userAddress
      .getDeleteUserAddressError(
        req.params.userAddressId,
      );
    if (false !== inputError) {
      res.status(status.BAD_REQUEST);
      return res.json({ error: inputError });
    }

    const cleanData = db.sequelize.models
      .userAddress
      .getDeleteUserAddressData(
        req.paramString("userAddressId"),
      );
    
    const deleteUserAddress = await db.sequelize
      .models
      .userAddress
      .deleteUserAddress(
        cleanData.userAddressId
      );
    if (false === deleteUserAddress) {
      res.status(status.INTERNAL_SERVER_ERROR);
      return res.json({ error: message500 });
    }

    return res.json({ message: message200 });
  },
);

module.exports = router;