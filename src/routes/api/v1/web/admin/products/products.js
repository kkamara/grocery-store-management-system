const express = require("express");
const db = require("../../../../../../models/v1");
const { status, } = require("http-status");
const multer = require("multer");
const { message500, message200, } = require("../../../../../../utils/httpResponses");
const adminAuthenticate = require("../../../../../../middlewares/v1/adminAuthenticate");
const { integerNumberRegex, } = require("../../../../../../utils/regexes");
const { defaultConfig, } = require("../../../../../../utils/uploads");
const { removeFile, } = require("../../../../../../utils/file");
const { nodeEnv, } = require("../../../../../../config/index");

const upload = multer(defaultConfig)
  .array("images", 7);

const router = express.Router();

router.get("/", adminAuthenticate, async (req, res) => {
  const page = req.query.page;
  if (page && null === `${page}`.match(integerNumberRegex)) {
    res.status(status.BAD_REQUEST);
    return res.json({
      error: "The page query parameter, if provided, must be type integer.",
    });
  }
  
  const products = await db.sequelize.models.product.searchAdminProducts(
    req.queryString("query"),
    page || 1,
  );
  if (false === products) {
    res.status(status.INTERNAL_SERVER_ERROR)
    return res.json({
      error: message500,
    });
  }

  return res.json(products);
});

router.post(
  "/",
  adminAuthenticate,
  (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }

      if ("production" !== nodeEnv) {
        console.log(req.body);
        console.log(req.files);
      }

      let photoError = false;
      if (req.files) {
        for (const file of req.files) {
          photoError = await db.sequelize.models
            .productPhoto
            .getUploadPhotoError(
              file.mimetype,
              file.size,
            );
          if (false !== photoError) {
            break;
          }
        }
      }
      
      if (false !== photoError) {
        if (req.files) {
          for (const file of req.files) {
            removeFile(file.path);
          }
        }
        res.status(status.BAD_REQUEST);
        return res.json({ error: photoError });
      }

      const fieldsError = await db.sequelize.models
        .product
        .getNewProductError(
          req.body,
        );
      if (false !== fieldsError) {
        if (req.files) {
          for (const file of req.files) {
            removeFile(file.path);
          }
        }
        res.status(status.BAD_REQUEST);
        return res.json({ error: fieldsError });
      }
      
      const cleanData = await db.sequelize
        .models
        .product
        .getNewProductData({
          name: req.bodyString("name"),
          units: req.bodyInt("units"),
          weight: req.bodyFloat("weight"),
          price: req.bodyFloat("price"),
          description: req.bodyString("description"),
          category: req.bodyInt("category"),
          manufacturer: req.bodyInt("manufacturer"),
          isLive: req.body.isLive,
          stripeProductId: req.bodyString("stripeProductId"),
          stripePriceId: req.bodyString("stripePriceId"),
        });
      if (false === cleanData) {
        if (req.files) {
          for (const file of req.files) {
            removeFile(file.path);
          }
        }
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }

      // Save product & photos to database
      const photos = [];
      if (req.files) {
        for (const file of req.files) {
          const fileExtension = file.mimetype
            .slice(1 + file.mimetype.indexOf("/"));
          const filename = file.filename + "." + fileExtension;
          const newPath = "public/images/productPhotos/" + filename;
          photos.push({
            from: file.path,
            mimetype: file.mimetype,
            filenameToBe: filename,
            newPath,
          });
        }
      }

      if ("production" !== nodeEnv) {
        console.log(photos);
      }

      const savedProduct = await db.sequelize
        .models
        .product
        .newProduct(cleanData);
      if (false === savedProduct) {
        if (req.files) {
          for (const file of req.files) {
            removeFile(file.path);
          }
        }
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }
      
      for (const photo of photos) {
        const savePhoto = await db.sequelize
          .models
          .productPhoto
          .newProductPhoto(
            savedProduct.productId,
            photo.filenameToBe,
            photo.newPath,
            photo.mimetype,
          );
        if (false === savePhoto) {
          photoError = true;
          break;
        }
      }
      if (false !== photoError) {
        if (req.files) {
          for (const file of req.files) {
            removeFile(file.path);
          }
        }
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }

      for (const file of photos) {
        db.sequelize.models
          .productPhoto
          .moveUploadedPhotoToPublicDir(
            file.from,
            file.newPath,
          );
      }

      return res.json({ message: message200 });
    })
  },
);

module.exports = router;