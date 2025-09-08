'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment-timezone");
const { nodeEnv, appTimezone, } = require("../../config");
const { mysqlTimeFormat, } = require("../../utils/time");
module.exports = (sequelize, DataTypes) => {
  class userAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * @param {number} id
     * @param {Object} options
     * @returns {object|false}
     */
    static async getUserAddressById(id, options) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE id = :id AND deletedAt IS NULL`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id }
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return await this.getFormattedUserAddressData(
          result[0],
          options,
        );
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {number} userId
     * @param {Object} options
     * @returns {object|false}
     */
    static async getUserAddressesByUserId(
      userId,
      options,
    ) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE usersId = :userId AND deletedAt IS NULL`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { userId },
          },
        );
        
        return await this.getFormattedUserAddressesData(
          result,
          options,
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
    static async getFormattedUserAddressesData(
      payload,
      options,
    ) {
      const result = [];
      for (const item of payload) {
        result.push(
          await this.getFormattedUserAddressData(
            item,
            options,
          )
        );
      }
      return result;
    }

    /**
     * @param {Object} payload
     * @param {boolean} [options.getUser=false] options.getUser
     * @returns 
     */
    static async getFormattedUserAddressData(
      payload,
      options,
    ) {
      const result = {
        id: payload.id,
        usersId: payload.usersId,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        zipCode: payload.zipCode,
        city: payload.city,
        state: payload.state,
        createdAt: moment(payload.createdAt)
          .tz(appTimezone)
          .format(mysqlTimeFormat),
        updatedAt: moment(payload.updatedAt)
          .tz(appTimezone)
          .format(mysqlTimeFormat),
      };
      if (options) {
        if (options.getUser) {
          const user = await db.sequelize
            .models
            .user
            .getUserById(
              payload.usersId,
            );
          if (user !== false) {
            result.user = user;
          }
        }
      }
      return result;
    }
  }
  userAddress.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    usersId: {
      type: DataTypes.INTEGER,
    },
    addressLine1: {
      type: DataTypes.STRING
    },
    addressLine2: {
      type: DataTypes.STRING
    },
    zipCode: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
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
    modelName: 'userAddress',
    tableName: "userAddresses",
  });
  return userAddress;
};