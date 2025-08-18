'use strict';
const moment = require("moment-timezone");
const { mysqlTimeFormat, } = require("../../utils/time");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const manufacturers = [
        { name: "Multinational Corporation" },
        { name: "Regional Business" },
        { name: "Large Regional Business" },
        { name: "Small Corporation" },
        { name: "Local Business" },
      ];
      const insertArray = [];
      for (const manufacturer of manufacturers) {
        insertArray.push({
          name: manufacturer.name,
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
