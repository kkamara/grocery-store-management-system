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
            WHERE usersId = :userId AND deletedAt IS NULL
            ORDER BY id DESC`,
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
        telephoneAreaCode: payload.telephoneAreaCode,
        telephone: payload.telephone,
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

    /**
     * @param {number} usersId
     * @param {Object} payload
     * @return {string|false}
     */
    static async getNewUserAddressError(usersId, payload) {
      if (!payload.addressLine1) {
        return "The address line 1 field is required.";
      }

      if (!payload.zipCode) {
        return "The zip code field is required.";
      }

      if (!payload.city) {
        return "The city field is required.";
      }

      if (!payload.state) {
        return "The state field is required.";
      }

      if (payload.telephoneAreaCode) {
        if ("string" !== typeof payload.telephoneAreaCode) {
          return "The telephone area code field must be of type string.";
        } else if (6 < payload.telephoneAreaCode.length) {
          return "The telephone area code field must not be greater than 6 characters.";
        }
      }

      if (!payload.telephone) {
        return "The telephone field is required.";
      } else if ("string" !== typeof payload.telephone) {
        return "The telephone field must be of type string.";
      } else if (30 < payload.telephone.length) {
        return "The telephone field must not be greater than 30 characters.";
      }

      const userAddresses = await this.
        getUserAddressesByUserId(
          usersId,
        );
      if (false !== userAddresses) {
        if (5 === userAddresses.length) {
          return "You can not have more than 5 delivery addresses.";
        }
      }

      return false;
    }

    /**
     * @param {Object} payload
     * @return {Object}
     */
    static getNewUserAddressData(payload) {
      const result = {};

      if (payload.addressLine1) {
        result.addressLine1 = payload.addressLine1;
      }

      if (payload.addressLine2) {
        result.addressLine2 = payload.addressLine2;
      }

      if (payload.zipCode) {
        result.zipCode = payload.zipCode;
      }

      if (payload.city) {
        result.city = payload.city;
      }

      if (payload.state) {
        result.state = payload.state;
      }

      if (payload.telephoneAreaCode) {
        result.telephoneAreaCode = payload.telephoneAreaCode;
      }

      if (payload.telephone) {
        result.telephone = payload.telephone;
      }

      return result;
    }

    /**
     * @param {number} userId
     * @param {Object} payload
     * @returns {object|false}
     */
    static async newUserAddress(
      userId,
      payload,
    ) {
      try {
        await sequelize.query(
          `INSERT INTO ${this.getTableName()}(usersId, addressLine1, addressLine2, zipCode, city, state, telephoneAreaCode, telephone, createdAt, updatedAt)
            VALUES(:usersId, :addressLine1, :addressLine2, :zipCode, :city, :state, :telephoneAreaCode, :telephone, :createdAt, :updatedAt)`,
          {
            type: sequelize.QueryTypes.INSERT,
            replacements: {
              addressLine1: payload.addressLine1,
              addressLine2: payload.addressLine2 || null,
              zipCode: payload.zipCode,
              city: payload.city,
              state: payload.state,
              telephoneAreaCode: payload.telephoneAreaCode,
              telephone: payload.telephone,
              usersId: userId,
              createdAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
            },
          },
        );
        
        return true;
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
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
    telephoneAreaCode: {
      type: DataTypes.STRING(6),
      defaultValue: null,
    },
    telephone: {
      type: DataTypes.STRING(30),
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