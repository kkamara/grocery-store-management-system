'use strict';
const moment = require("moment-timezone");
const { faker, } = require('@faker-js/faker');
const { mysqlTimeFormat, } = require("../../utils/time");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const insertArray = [];
      for (let i = 0; i < 15; i++) {
        insertArray.push({
          name: faker.internet.displayName(),
          createdAt: moment().utc().format(mysqlTimeFormat),
          updatedAt: moment().utc().format(mysqlTimeFormat),
        });
      }
      await queryInterface.bulkInsert(
        'manufacturers',
        insertArray,
        { transaction },
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
      await queryInterface.bulkDelete('manufacturers', null, { transaction, });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
