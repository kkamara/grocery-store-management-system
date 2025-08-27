'use strict';
const moment = require("moment-timezone");
const { mysqlTimeFormat, } = require("../../utils/time");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const categories = [
        { name: "Food Cupboard" },
        { name: "Frozen Foods" },
        { name: "Sweets & Snacks" },
        { name: "Meat & Seafood" },
        { name: "Bakery" },
        { name: "Dairy" },
        { name: "Refrigerated Items" },
        { name: "Drinks" },
        { name: "Alcohol" },
        { name: "Household Goods" },
        { name: "Toys" },
      ];
      const insertArray = [];
      for (const category of categories) {
        insertArray.push({
          name: category.name,
          createdAt: moment().utc().format(mysqlTimeFormat),
          updatedAt: moment().utc().format(mysqlTimeFormat),
        });
      }
      await queryInterface.bulkInsert(
        'categories',
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
      await queryInterface.bulkDelete('categories', null, { transaction, });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
