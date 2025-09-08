'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment-timezone");
const { roundTo2DecimalNumbers } = require('../../utils/numbers');
const { nodeEnv, appTimezone, } = require("../../config");
const { mysqlTimeFormat, } = require("../../utils/time");
module.exports = (sequelize, DataTypes) => {
  class shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * @returns {string|false}
     */
    static async getAdminOngoingShipmentsPercentageStat() {
      try {
        const part = await sequelize.query(
          `SELECT count(id) as count
            FROM ${this.getTableName()}
            WHERE status IS NULL`,
          {
            type: sequelize.QueryTypes.SELECT,
          },
        );
        
        const whole = await sequelize.query(
          `SELECT count(id) as count
            FROM ${this.getTableName()}`,
          {
            type: sequelize.QueryTypes.SELECT,
          },
        );

        if (0 === whole[0].count) {
          return { percentage: "0%", };
        }
        
        let result = (part[0].count / whole[0].count) * 100;
        if (0 < result) {
          result = roundTo2DecimalNumbers(result);
        }
        return { percentage: result + "%" };
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {number} id
     * @param {Object} options
     * @returns {object|false}
     */
    static async getShippingById(
      id,
      options,
    ) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE id = :id AND
            deletedAt IS NULL`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id }
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return this.getFormattedShippingData(
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
     * @param {array} payload
     */
    static getFormattedShippingsData(
      payload
    ) {
      const result = [];
      for (const item of payload) {
        result.push(
          this.getFormattedShippingData(
            item
          )
        );
      }
      return result;
    }

    /**
     * @param {Object} payload
     * @returns 
     */
    static getFormattedShippingData(
      payload
    ) {
      return {
        id: payload.id,
        status: payload.status,
        createdAt: moment(payload.createdAt)
          .tz(appTimezone)
          .format(mysqlTimeFormat),
        updatedAt: moment(payload.updatedAt)
          .tz(appTimezone)
          .format(mysqlTimeFormat),
      };
    }
    
    /**
     * @param {string} payload
     * @returns {number|false}
     */
    static async newShipping(
      payload,
    ) {
      try {
        const result = await sequelize.query(
          `INSERT INTO ${this.getTableName()}(status, createdAt, updatedAt)
            VALUES(:status, :createdAt, :updatedAt)`,
          {
            type: sequelize.QueryTypes.INSERT,
            replacements: {
              ...payload,
              createdAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
            }
          },
        );
        
        return { shippingId: result[0] };
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }
    
    /**
     * @param {number} id
     * @param {string} payload
     * @returns {boolean}
     */
    static async updateShipping(
      id,
      payload,
    ) {
      try {
        await sequelize.query(
          `UPDATE ${this.getTableName()}
            SET status = COALESCE(:status, status),
              createdAt = COALESCE(:createdAt, createdAt),
              updatedAt = COALESCE(:updatedAt, updatedAt)
            WHERE id = :id`,
          {
            type: sequelize.QueryTypes.UPDATE,
            replacements: {
              ...payload,
              id,
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
            }
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
  shipping.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    status: {
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
    modelName: 'shipping',
    tableName: "shippings",
  });
  return shipping;
};