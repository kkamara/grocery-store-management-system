const express = require("express");
const db = require("../../../../../../models/v1");
const { status, } = require("http-status");
const { message500, message404, } = require("../../../../../../utils/httpResponses");
const adminAuthenticate = require("../../../../../../middlewares/v1/adminAuthenticate");

const router = express.Router({
  mergeParams: true,
});

router.get("/", adminAuthenticate, async (req, res) => {
  const product = await db.sequelize.models
    .product
    .getProductBySlug(
      req.paramString("productSlug"),
    );
  if (false === product) {
    res.status(status.NOT_FOUND);
    return res.json({ message: message404, });
  }
  return res.json({ data: product, });
});

module.exports = router;