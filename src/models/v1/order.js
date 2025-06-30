'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    paymentMethod: {
      type: DataTypes.STRING
    },
    billingReference: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.FLOAT
    },
    shippingsId: {
      type: DataTypes.INTEGER
    },
    userAddressesId: {
      type: DataTypes.INTEGER
    },
    usersId: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'order',
    tableName: "orders",
  });
  return order;
};