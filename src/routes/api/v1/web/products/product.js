const express = require("express");
const { status, } = require("http-status");
const db = require("../../../../../models/v1");
const { message404, } = require("../../../../../utils/httpResponses");

const router = express.Router({
  mergeParams: true,
});

router.get("/", async (req, res) => {
  const product = await db.sequelize.models
    .product
    .getProductBySlug(
      req.paramString("productSlug"),
    );
  if (false === product) {
    res.status(status.NOT_FOUND);
    return res.json({ error: message404, });
  }
  const photos = await db.sequelize.models
    .productPhoto
    .getProductPhotos(product.id);
  if (false === photos) {
    product.photos = null;
  } else {
    product.photos = photos;
  }
  return res.json({ data: product, });
});

module.exports = router;