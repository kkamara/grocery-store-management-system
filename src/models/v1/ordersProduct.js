'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment-timezone");
const { nodeEnv, } = require('../../config');
const { mysqlTimeFormat, } = require('../../utils/time');

module.exports = (sequelize, DataTypes) => {
  class ordersProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * @param {Object} data
     * @returns {object|false}
     */
    static async newOrdersProduct(data) {
      try {
        const result = await sequelize.query(
          `INSERT INTO ${this.getTableName()}(productsId, ordersId, quantity, price, stripeProductId, stripePriceId, createdAt, updatedAt)
            VALUES(:productsId, :ordersId, :quantity, :price, :stripeProductId, :stripePriceId, :createdAt, :updatedAt)`,
          {
            type: sequelize.QueryTypes.INSERT,
            replacements: {
              productsId: data.productsId,
              ordersId: data.ordersId,
              quantity: data.quantity,
              price: data.price,
              stripeProductId: data.stripeProductId || null,
              stripePriceId: data.stripePriceId || null,
              createdAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
            },
          },
        );

        return { ordersProductId: result[0] };
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }
  }
  ordersProduct.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productsId: {
      type: DataTypes.INTEGER
    },
    ordersId: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.FLOAT
    },
    stripeProductId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripePriceId: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'ordersProduct',
    tableName: "ordersProducts",
  });
  return ordersProduct;
};