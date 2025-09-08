'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "ordersProducts",
        "stripePriceId",
        {
          type: Sequelize.STRING,
          defaultValue: null,
          after: "stripeProductId",
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
        "stripePriceId",
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
