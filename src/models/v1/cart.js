'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment-timezone");
const { nodeEnv, appTimezone, } = require("../../config/index");
const { mysqlTimeFormat, } = require('../../utils/time');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * @param {number} usersId
     * @returns {array|false}
     */
    static async getCart(usersId) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE usersId = :usersId AND deletedAt IS NULL`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { usersId },
          },
        );

        return await this.getFormattedCartsData(
          result,
        );
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {array} payload 
     */
    static async getFormattedCartsData(
      payload,
    ) {
      const result = [];
      for (const cartItem of payload) {
        result.push(
          await this.getFormattedCartData(
            cartItem,
          ),
        );
      }
      return result;
    }

    /**
     * @param {Object} payload 
     */
    static async getFormattedCartData(
      payload,
    ) {
      const result = {
        id: payload.id,
        usersId: payload.usersId,
        productsId: payload.productsId,
        quantity: payload.quantity,
        createdAt: moment(payload.createdAt)
          .tz(appTimezone)
          .format(mysqlTimeFormat),
        updatedAt: moment(payload.updatedAt)
          .tz(appTimezone)
          .format(mysqlTimeFormat),
      };
      result.product = await this.sequelize.models
        .product
        .getProduct(
          result.productsId,
        );
      if (false !== result.product) {
        result.price = result.product.slice(1) * result.quantity;
      }
      return result;
    }
  }
  cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    usersId: {
      type: DataTypes.INTEGER
    },
    productsId: {
      type: DataTypes.INTEGER
    },
    quantity: {
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
    modelName: 'cart',
    tableName: "carts",
  });
  return cart;
};