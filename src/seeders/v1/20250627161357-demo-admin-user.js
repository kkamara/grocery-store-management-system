'use strict';
const moment = require("moment-timezone");
const { faker, } = require('@faker-js/faker');
const { mysqlTimeFormat, } = require("../../utils/time");
const { appTimezone, } = require("../../config/index");
const { encrypt, } = require("../../utils/tokens");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const pwd = encrypt("secret");

      await queryInterface.bulkInsert('users', [{
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        password: pwd.hash,
        passwordSalt: pwd.salt,
        role: "admin",
        createdAt: moment().utc().format(mysqlTimeFormat),
        updatedAt: moment().utc().format(mysqlTimeFormat),
      }], { transaction, });
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
