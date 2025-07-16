const express = require("express");
const db = require("../../../../../../models/v1");
const { status, } = require("http-status");
const { message500, message404, message200, } = require("../../../../../../utils/httpResponses");
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

router.delete("/", adminAuthenticate, async (req, res) => {
  const product = await db.sequelize.models
    .product
    .getProductBySlug(
      req.paramString("productSlug"),
    );
  if (false === product) {
    res.status(status.NOT_FOUND);
    return res.json({ message: message404, });
  }
  const deleteProduct = await db.sequelize.models
    .product
    .deleteProduct(
      product.id,
    );
  if (false === deleteProduct) {
    res.status(status.NOT_FOUND);
    return res.json({ message: message500, });
  }
  try {
    await db.sequelize.models
      .product
      .updateProductTimestamp(
        product.id,
      );
  } catch (err) {}
  return res.json({ message: message200 });
});

module.exports = router;