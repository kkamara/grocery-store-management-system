const { rmSync, } = require("node:fs");

exports.removeFile = async path => {
  rmSync(path);
};

// 3MB
exports.fileSize = 3145728;

exports.productPhotoAsset = fileName => {
  return `public/images/productPhotos/${fileName}`;
}