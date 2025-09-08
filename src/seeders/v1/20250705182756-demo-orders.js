'use strict';
const moment = require("moment-timezone");
const { faker, } = require('@faker-js/faker');
const { mysqlTimeFormat, } = require("../../utils/time");
const { generateToken } = require("../../utils/tokens");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      for (let i = 0; i < 30; i++) {
        const userResult = await queryInterface.sequelize.query(
          "SELECT id FROM users ORDER BY rand() LIMIT 1",
          { type: Sequelize.QueryTypes.SELECT, transaction },
        );

        if (0 === userResult.length) {
          throw new Error("No users are available to select.");
        }
        
        const userAddressesResult = await queryInterface.sequelize.query(
          `SELECT id FROM userAddresses
            WHERE usersId = :id
            ORDER BY rand()
            LIMIT 1`,
          { 
            replacements: { id: userResult[0].id },
            type: Sequelize.QueryTypes.SELECT,
            transaction,
          },
        );

        if (0 === userAddressesResult.length) {
          throw new Error("No user addresses are available to select.");
        }

        let createdAt = null;
        if (0 === faker.number.int({ min: 0, max: 1, })) {
          createdAt = moment().utc().subtract(
            faker.number.int({ min: 1, max: 5, }),
            "weeks",
          ).format(mysqlTimeFormat);
        } else {
          createdAt = moment().utc().subtract(
            faker.number.int({ min: 1, max: 5, }),
            "months",
          ).format(mysqlTimeFormat);
        }

        const shippingsInsertResult = await queryInterface.sequelize.query(
          `INSERT INTO shippings(status, createdAt, updatedAt)
            VALUES (:status, :createdAt, :updatedAt)`,
          {
            replacements: {
              status: 0 === faker.number.int({ min: 0, max: 1 }) ?
                "shipped" :
                "placed",
              createdAt: createdAt,
              updatedAt: createdAt,
            },
            type: Sequelize.QueryTypes.INSERT,
            transaction,
          }
        );

        const productsForOrderResult = await queryInterface.sequelize.query(
          "SELECT * FROM products ORDER BY rand() LIMIT :limit",
          {
            type: Sequelize.QueryTypes.SELECT, transaction,
            replacements: { limit: faker.number.int({ min: 1, max: 10, }) },
          },
        );

        if (0 === productsForOrderResult.length) {
          throw new Error("No products are available to select.");
        }

        let orderTotalPrice = 0;
        for (const productForOrder of productsForOrderResult) {
          orderTotalPrice += productForOrder.price;
        }

        const orderInsertResult = await queryInterface.sequelize.query(
          `INSERT INTO orders(paymentMethod, billingReference, amount, shippingsId, userAddressesId, usersId, createdAt, updatedAt)
            VALUES (:paymentMethod, :billingReference, :amount, :shippingsId, :userAddressesId, :usersId, :createdAt, :updatedAt)`,
          {
            replacements: {
              paymentMethod: "visa",
              name: faker.commerce.productName(),
              billingReference: generateToken(10),
              amount: orderTotalPrice,
              shippingsId: shippingsInsertResult[0],
              userAddressesId: userAddressesResult[0].id,
              usersId: userResult[0].id,
              createdAt: createdAt,
              updatedAt: createdAt,
            },
            type: Sequelize.QueryTypes.INSERT,
            transaction,
          }
        );
        const orderId = orderInsertResult[0];

        for (const productForOrder of productsForOrderResult) {
          await queryInterface.sequelize.query(
            `INSERT INTO ordersProducts(productsId, ordersId, quantity, price, stripeProductId, stripePriceId, createdAt, updatedAt)
              VALUES (:productsId, :ordersId, :quantity, :price, :stripeProductId, :stripePriceId, :createdAt, :updatedAt)`,
            {
              replacements: {
                productsId: productForOrder.id,
                ordersId: orderId,
                quantity: 1,
                price: orderTotalPrice,
                stripeProductId: productForOrder.stripeProductId,
                stripePriceId: productForOrder.stripePriceId,
                createdAt: moment()
                  .utc()
                  .format(mysqlTimeFormat),
                updatedAt: moment()
                  .utc()
                  .format(mysqlTimeFormat),
              },
              type: Sequelize.QueryTypes.INSERT,
              transaction,
            }
          );
        }
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('orders', null, { transaction, });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
