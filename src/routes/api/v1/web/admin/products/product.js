const express = require("express");
const { status, } = require("http-status");
const multer = require("multer");
const db = require("../../../../../../models/v1");
const { message500, message404, message200, } = require("../../../../../../utils/httpResponses");
const adminAuthenticate = require("../../../../../../middlewares/v1/adminAuthenticate");
const { removeFile, productPhotoAsset, } = require("../../../../../../utils/file");
const { nodeEnv, } = require("../../../../../../config");
const { defaultConfig, } = require("../../../../../../utils/uploads");

const upload = multer(defaultConfig)
  .array("images", 7);

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

router.put(
  "/photos",
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
        console.log(req.files);
        console.log(req.body);
      }
      const product = await db.sequelize.models
        .product
        .getAdminProductBySlug(
          req.paramString("productSlug"),
        );
      if (false === product) {
        res.status(status.NOT_FOUND);
        return res.json({ error: message404, });
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
      
      for (const photo of photos) {
        const savePhoto = await db.sequelize
          .models
          .productPhoto
          .newProductPhoto(
            product.id,
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

      if (req.body.uploadedPhotos) {
        try {
          const uploadedPhotos = JSON.parse(req.body.uploadedPhotos)
          if (Array.isArray(uploadedPhotos)) {
            for (const photo of uploadedPhotos) {
              if (photo.reset) {
                const deletePhoto = await db.sequelize.models
                  .productPhoto
                  .deleteProductPhoto(
                    photo.id,
                  );
                if (false === deletePhoto) {
                  if ("production" !== nodeEnv) {
                    console.log(
                      "Error encountered when soft-deleting product photo from our records."
                    );
                  }
                }
                removeFile("public/images/productPhotos/"+photo.name);
              }
            }
          }
        } catch (err) {
          res.status(status.INTERNAL_SERVER_ERROR);
          return res.json({ error: message500 });
        }
      }

      return res.json({ message: message200 });
    })
  },
);

router.put(
  "/",
  adminAuthenticate,
  async (req, res) => {
    if ("production" !== nodeEnv) {
      console.log(req.body);
    }
    const product = await db.sequelize.models
      .product
      .getAdminProductBySlug(
        req.paramString("productSlug"),
      );
    if (false === product) {
      res.status(status.NOT_FOUND);
      return res.json({ error: message404, });
    }
    
    const fieldsError = await db.sequelize.models
      .product
      .getUpdateProductError(
        req.body,
        product,
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
      .getEditProductData({
        name: req.bodyString("name"),
        units: req.bodyInt("units"),
        weight: req.bodyFloat("weight"),
        price: req.bodyFloat("price"),
        description: req.bodyString("description"),
        category: req.bodyInt("category"),
        manufacturer: req.bodyInt("manufacturer"),
        isLive: req.body.isLive,
      });
    if (false === cleanData) {
      res.status(status.INTERNAL_SERVER_ERROR);
      return res.json({ error: message500 });
    }

    const savedProduct = await db.sequelize
      .models
      .product
      .updateProduct(product.id, cleanData);
    if (false === savedProduct) {
      res.status(status.INTERNAL_SERVER_ERROR);
      return res.json({ error: message500 });
    }

    return res.json({ message: message200 });
  },
);

module.exports = router;