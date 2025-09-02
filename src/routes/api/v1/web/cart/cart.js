const express = require("express");
const { default: status } = require("http-status");
const authenticate = require("../../../../../middlewares/v1/authenticate");
const db = require("../../../../../models/v1/index");
const { message200, message500, } = require("../../../../../utils/httpResponses");

const router = express.Router();

router.get(
  "/",
  authenticate,
  async (req, res) => {
    const usersCart = await db.sequelize.models
      .cart
      .getCart(
        req.session.userId,
      );
    
    let cost = 0;
    for (const cartItem of usersCart) {
      cost += Number(cartItem.price.slice(1));
    }
    cost = "£"+cost.toFixed(2);
    
    return res.json({
      data: {
        totalPrice: cost,
        cart: usersCart,
      },
    });
  }
);

router.post(
  "/:productId",
  authenticate,
  async (req, res) => {
    const product = await db.sequelize.models
      .product
      .getProduct(
        req.params.productId,
      );
    if (false === product) {
      res.status(status.NOT_FOUND);
      return res.json({ error: "Product not found." });
    }

    const usersCart = await db.sequelize.models
      .cart
      .getCart(
        req.session.userId,
      );
    
    let foundProductCartItem = false;
    for (const cartItem of usersCart) {
      if (cartItem.productsId == req.params.productId) {
        foundProductCartItem = cartItem;
      }
    }

    if (false !== foundProductCartItem) {
      // Update existing cart item.
      const updateCartItem = await db.sequelize.models
        .cart
        .updateCartItem(
          foundProductCartItem.id,
          { quantity: 1 + foundProductCartItem.quantity },
        );
      if (false === updateCartItem) {
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }
    } else {
      // Add new cart item.
      const addToCart = await db.sequelize.models
        .cart
        .addToCart(
          req.session.userId,
          { quantity: 1, productsId: product.id, },
        );
      if (false === addToCart) {
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }
    }

    return res.json({ message: message200 });
  }
);

router.delete(
  "/:productId",
  authenticate,
  async (req, res) => {
    const product = await db.sequelize.models
      .product
      .getProduct(
        req.params.productId,
      );
    if (false === product) {
      res.status(status.NOT_FOUND);
      return res.json({ error: "Product not found." });
    }

    const usersCart = await db.sequelize.models
      .cart
      .getCart(
        req.session.userId,
      );
    
    let foundProductCartItem = false;
    for (const cartItem of usersCart) {
      if (cartItem.productsId == req.params.productId) {
        foundProductCartItem = cartItem;
      }
    }

    if (false === foundProductCartItem) {
      res.status(status.NOT_FOUND);
      return res.json({ error: "The product is not in your cart." });
    }

    if (1 === foundProductCartItem.quantity) {
      const deleteCartItem = await db.sequelize.models
        .cart
        .deleteCartItem(
          foundProductCartItem.id,
        );
      if (false === deleteCartItem) {
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }
    } else {
      const updateCartItem = await db.sequelize.models
        .cart
        .updateCartItem(
          foundProductCartItem.id,
          {
            quantity: foundProductCartItem.quantity - 1,
          },
        );
      if (false === updateCartItem) {
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }
    }

    return res.json({ message: message200 });
  }
);

router.get(
  "/count",
  authenticate,
  async (req, res) => {
    const usersCart = await db.sequelize.models
      .cart
      .getCart(
        req.session.userId,
      );
    let count = 0;
    for (const cartItem of usersCart) {
      count += cartItem.quantity;
    }
    
    return res.json({ count });
  },
);

module.exports = router;