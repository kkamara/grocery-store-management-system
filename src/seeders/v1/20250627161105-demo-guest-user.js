'use strict';
const moment = require("moment-timezone");
const { faker, } = require('@faker-js/faker');
const { mysqlTimeFormat, } = require("../../utils/time");
const { encrypt, } = require("../../utils/tokens");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const pwd = encrypt("secret");

      const userInsertResult = await queryInterface.sequelize.query(
        `INSERT INTO users(email, firstName, lastName, password, passwordSalt, role, createdAt, updatedAt)
          VALUES (:email, :firstName, :lastName, :password, :passwordSalt, :role, :createdAt, :updatedAt)`,
        {
          replacements: {
            email: "guest@example.com",
            firstName: "Guest",
            lastName: "User",
            password: pwd.hash,
            passwordSalt: pwd.salt,
            role: "guest",
            createdAt: moment().utc().format(mysqlTimeFormat),
            updatedAt: moment().utc().format(mysqlTimeFormat),
          },
          type: Sequelize.QueryTypes.INSERT,
          transaction,
        }
      );
      const usersId = userInsertResult[0];
      await queryInterface.sequelize.query(
        `INSERT INTO userAddresses(usersId, addressLine1, addressLine2, zipCode, city, state, telephone, createdAt, updatedAt)
          VALUES (:usersId, :addressLine1, :addressLine2, :zipCode, :city, :state, :telephone, :createdAt, :updatedAt)`,
        {
          replacements: {
            addressLine1: faker.location.streetAddress(),
            addressLine2: faker.location.secondaryAddress(),
            zipCode: faker.location.zipCode(),
            city: faker.location.city(),
            state: faker.location.state(),
            telephone: faker.phone.number({
              international: true,
            }),
            createdAt: moment().utc().format(mysqlTimeFormat),
            updatedAt: moment().utc().format(mysqlTimeFormat),
            usersId,
          },
          type: Sequelize.QueryTypes.INSERT,
          transaction,
        }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('users', null, { transaction, });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
