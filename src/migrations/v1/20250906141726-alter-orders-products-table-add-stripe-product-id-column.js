'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "ordersProducts",
        "stripeProductId",
        {
          type: Sequelize.STRING,
          defaultValue: null,
          after: "price",
        },
        { transaction },
      );
      transaction.commit();
    } catch (err) {
      transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn(
        "ordersProducts",
        "stripeProductId",
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
