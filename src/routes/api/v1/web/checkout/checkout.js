const express = require("express");
const { status } = require("http-status");
const moment = require("moment-timezone");
const db = require("../../../../../models/v1");
const authenticate = require("../../../../../middlewares/v1/authenticate");
const {
  message404,
  message200,
  message500,
} = require("../../../../../utils/httpResponses");
const {
  stripeSecretKey,
  nodeEnv,
  appURL,
} = require("../../../../../config/index");
const { generateToken } = require("../../../../../utils/tokens");
const stripe = require("stripe")(stripeSecretKey);

const router = express.Router();

router.get(
  "/:billingReference",
  authenticate,
  async (req, res) => {
    const order = await db.sequelize.models
      .order
      .getOrderByBillingReference(
        req.paramString("billingReference"),
        {
          getShipping: true,
          getUserAddress: true,
          getUser: true,
        },
      );
    if (false === order) {
      res.status(status.NOT_FOUND);
      return res.json({ error: message404 });
    }

    const userOwnsOrder = order.usersId === req.session.userId;
    if (false === userOwnsOrder) {
      res.status(status.NOT_FOUND);
      return res.json({ error: "You have not made this order." });
    }

    const orderTimestamp = moment(
      order.createdAt
    )
      .utc()
      .unix();
    const thirtyMinutesAgoTimestamp = moment()
      .utc()
      .subtract(
        30, "minutes"
      )
      .unix();
    if (orderTimestamp < thirtyMinutesAgoTimestamp) {
      res.status(status.NOT_FOUND);
      return res.json({ error: message404 });
    }

    return res.json({ data: order })
  },
);

router.post(
  '/create-checkout-session',
  authenticate,
  async (req, res) => {
    const userAddressId = req.bodyInt("userAddress");
    if (!userAddressId) {
      res.status(status.BAD_REQUEST);
      return res.json({ error: "The user address id field is missing." });
    }
    const userAddressFromDB = await db.sequelize
      .models
      .userAddress
      .getUserAddressById(
        userAddressId
      );
    if (false === userAddressFromDB) {
      res.status(status.NOT_FOUND);
      return res.json({
        error: "The user address id was not found."
      });
    }
    const usersCart = await db.sequelize.models
      .cart
      .getCart(
        req.session.userId,
      );
    if (0 === usersCart.length) {
      res.status(status.BAD_REQUEST);
      return res.json({ error: "User's cart is empty." });
    }
    const shipping = await db.sequelize.models
      .shipping
      .newShipping({ status: "unpaid", });
    if (false === shipping) {
      res.status(status.INTERNAL_SERVER_ERROR);
      return res.json({ error: message500 });
    }
    const billingReference = generateToken(10);
    const order = await db.sequelize.models
      .order
      .newOrder({
        billingReference,
        paymentMethod: "visa",
        amount: usersCart.price.slice(1),
        shippingsId: shipping.shippingId,
        userAddressId: userAddressFromDB.id,
        usersId: req.session.userId,
      });
    if (false === order) {
      res.status(status.INTERNAL_SERVER_ERROR);
      return res.json({ error: message500 });
    }
    const lineItems = [];
    for (const cartItem of usersCart) {
      lineItems.push({
        price: cartItem.product.stripePriceId,
        quantity: cartItem.quantity,
      });
      const newOrdersProduct = await db.sequelize.models
        .ordersProduct
        .newOrdersProduct({
          productsId: cartItem.product.id,
          ordersId: order.orderId,
          quantity: cartItem.quantity,
          stripeProductId: cartItem.product.stripeProductId,
          stripePriceId: cartItem.product.stripePriceId,
        });
      if (false === newOrdersProduct) {
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }
      const deleteCartItem = await db.sequelize.models
        .cart
        .deleteCartItem(
          cartItem.id
        );
      if (false === deleteCartItem) {
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({ error: message500 });
      }
    }
    
    let returnURL = appURL+"/checkout/"+billingReference;
    if ("production" !== nodeEnv){
      returnURL = "http://localhost:3000/checkout/"+billingReference;
    }
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: returnURL,
      cancel_url: returnURL+"/?cancelled=true",
      automatic_tax: {enabled: true},
      metadata: { billingReference, },
    });

    return res.json({ redirectURL: session.url });
  },
);

router.post('/webhook', async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      if ("production" !== nodeEnv) {
        console.log('PaymentIntent was successful!', paymentIntent);
      }
      const billingReference = paymentIntent
        .metadata
        .billingReference;
      const order = await db.sequelize.models
        .order
        .getOrderByBillingReference(
          billingReference
        );
      if (false === order) {
        res.status(status.BAD_REQUEST);
        return res.json({
          error: "The order was not found."
        });
      }
      const updateShipping = await db.sequelize.models
        .shipping
        .updateShipping(
          order.shippingsId,
          {
            status: "paid",
          },
        )
      if (false === updateShipping) {
        res.status(status.INTERNAL_SERVER_ERROR);
        return res.json({
          error: "Unable to update shipping status."
        });
      }
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      if ("production" !== nodeEnv) {
        console.log('PaymentMethod was attached to a Customer!', paymentMethod);
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ message: message200 });
});

module.exports = router;