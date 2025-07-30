const { rmSync, } = require("node:fs");

exports.removeFile = async path => {
  rmSync(path);
};