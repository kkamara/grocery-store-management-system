const express = require("express");
const { status, } = require("http-status");
const db = require("../../../../../../models/v1");
const { message500, message404, message200, } = require("../../../../../../utils/httpResponses");
const adminAuthenticate = require("../../../../../../middlewares/v1/adminAuthenticate");
const { removeFile, productPhotoAsset, } = require("../../../../../../utils/file");
const { nodeEnv, } = require("../../../../../../config");

const router = express.Router({
  mergeParams: true,
});

router.get("/", adminAuthenticate, async (req, res) => {
  const product = await db.sequelize.models
    .product
    .getAdminProductBySlug(
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

router.get("/edit", adminAuthenticate, async (req, res) => {
  const product = await db.sequelize.models
    .product
    .getAdminProductBySlug(
      req.paramString("productSlug"),
      { unformatted: true },
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

router.delete("/", adminAuthenticate, async (req, res) => {
  const product = await db.sequelize.models
    .product
    .getAdminProductBySlug(
      req.paramString("productSlug"),
    );
  if (false === product) {
    res.status(status.NOT_FOUND);
    return res.json({ error: message404, });
  }

  const productPhotos = await db.sequelize.models
    .productPhoto
    .getProductPhotos(
      product.id,
    );
  if (false !== productPhotos) {
    for(const photo of productPhotos) {
      removeFile(productPhotoAsset(photo.name));

      const deletePhoto = await db.sequelize.models
        .productPhoto
        .deleteProductPhoto(
          photo.id,
        );
      if (false === deletePhoto) {
        if ("production" !== nodeEnv) {
          console.log(
            "Delete product image failed with id "+photo.id,
          )
        }
      }
    }
  }

  const deleteProduct = await db.sequelize.models
    .product
    .deleteProduct(
      product.id,
    );
  if (false === deleteProduct) {
    res.status(status.NOT_FOUND);
    return res.json({ error: message500, });
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