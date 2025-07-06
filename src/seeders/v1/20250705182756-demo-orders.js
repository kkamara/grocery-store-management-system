'use strict';
const moment = require("moment-timezone");
const { faker, } = require('@faker-js/faker');
const { mysqlTimeFormat, } = require("../../utils/time");

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
                null,
              createdAt: createdAt,
              updatedAt: createdAt,
            },
            type: Sequelize.QueryTypes.INSERT,
            transaction,
          }
        );

        await queryInterface.sequelize.query(
          `INSERT INTO orders(paymentMethod, billingReference, amount, shippingsId, userAddressesId, usersId, createdAt, updatedAt)
            VALUES (:paymentMethod, :billingReference, :amount, :shippingsId, :userAddressesId, :usersId, :createdAt, :updatedAt)`,
          {
            replacements: {
              paymentMethod: "debit-card",
              name: faker.commerce.productName(),
              billingReference: faker.number.int({ min: 100000000, max: 999999999, }),
              amount: faker.number.float({ min: 0, max: 100, }),
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
