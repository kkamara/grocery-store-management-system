const express = require("express");
const db = require("../../../../../../models/v1");
const { status, } = require("http-status");
const { message500, message200, } = require("../../../../../../utils/httpResponses");
const adminAuthenticate = require("../../../../../../middlewares/v1/adminAuthenticate");
const { integerNumberRegex, } = require("../../../../../../utils/regexes");

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

router.post("/", adminAuthenticate, async (req, res) => {
  console.log(req.body);
  return res.json({ message: message200 });
});

module.exports = router;