'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "userAddresses",
        "telephoneAreaCode",
        {
          type: Sequelize.STRING(6),
          defaultValue: null,
          after: "state",
        },
        { transaction },
      );
      await queryInterface.addColumn(
        "userAddresses",
        "telephone",
        {
          type: Sequelize.STRING(30),
          after: "telephoneAreaCode",
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
        "userAddresses",
        "telephoneAreaCode",
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
