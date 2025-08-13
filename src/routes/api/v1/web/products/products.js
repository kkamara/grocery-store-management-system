const express = require("express");
const { status, } = require("http-status");
const db = require("../../../../../models/v1");
const { message500, } = require("../../../../../utils/httpResponses");
const { integerNumberRegex, } = require("../../../../../utils/regexes");

const router = express.Router();

router.get("/", async (req, res) => {
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

module.exports = router;