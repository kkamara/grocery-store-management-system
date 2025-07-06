'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment-timezone");
const { mysqlTimeFormat, } = require("../../utils/time");
const { nodeEnv, } = require("../../config");
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

    /**
     * @returns {object|false}
     */
    static async getAdminLastMonthOrdersCountStat() {
      try {
        const result = await sequelize.query(
          `SELECT count(id) as count
            FROM ${this.getTableName()}
            WHERE createdAt > DATE_SUB(curdate(), INTERVAL 1 MONTH)`,
          {
            type: sequelize.QueryTypes.SELECT,
          },
        );
        
        return { count: result[0].count };
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @returns {object}
     */
    static async getPast3MonthEarnings() {
      let result = {
        labels: [
          moment().subtract(2, "months").format("MMM"),
          moment().subtract(1, "months").format("MMM"),
          moment().format("MMM"),
        ],
        datasets: [{
          id: 1,
          label: "Dataset 1",
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }],
      };
      try {
        const threeMonthAgoResults = await sequelize.query(
          `SELECT sum(amount) as amountSum
            FROM orders
            WHERE createdAt > :from
              AND createdAt < :to`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
              from: moment()
                .subtract(3, "months")
                .format(mysqlTimeFormat),
              to: moment()
                .subtract(2, "months")
                .format(mysqlTimeFormat),
            }
          }
        );
        const twoMonthAgoResults = await sequelize.query(
          `SELECT sum(amount) as amountSum
            FROM orders
            WHERE createdAt > :from
              AND createdAt < :to`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
              from: moment()
                .subtract(2, "months")
                .format(mysqlTimeFormat),
              to: moment()
                .subtract(1, "months")
                .format(mysqlTimeFormat),
            }
          }
        );
        const lastMonthResults = await sequelize.query(
          `SELECT sum(amount) as amountSum
            FROM orders
            WHERE createdAt > :from
              AND createdAt < :to`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
              from: moment()
                .subtract(1, "months")
                .format(mysqlTimeFormat),
              to: moment().format(mysqlTimeFormat),
            }
          }
        );
        result.datasets[0].data.push(
          Math.round((threeMonthAgoResults[0].amountSum + Number.EPSILON) * 100) / 100
        );
        result.datasets[0].data.push(
          Math.round((twoMonthAgoResults[0].amountSum + Number.EPSILON) * 100) / 100
        );
        result.datasets[0].data.push(
          Math.round((lastMonthResults[0].amountSum + Number.EPSILON) * 100) / 100
        );
        return result;
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @returns {object}
     */
    static async getPast3MonthOrders() {
      let result = {
        labels: [
          moment().subtract(2, "months").format("MMM"),
          moment().subtract(1, "months").format("MMM"),
          moment().format("MMM"),
        ],
        datasets: [{
          id: 1,
          label: "Dataset 1",
          data: [],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }],
      };
      try {
        const threeMonthAgoResults = await sequelize.query(
          `SELECT count(amount) as amountCount
            FROM orders
            WHERE createdAt > :from
              AND createdAt < :to`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
              from: moment()
                .subtract(3, "months")
                .format(mysqlTimeFormat),
              to: moment()
                .subtract(2, "months")
                .format(mysqlTimeFormat),
            }
          }
        );
        const twoMonthAgoResults = await sequelize.query(
          `SELECT count(amount) as amountCount
            FROM orders
            WHERE createdAt > :from
              AND createdAt < :to`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
              from: moment()
                .subtract(2, "months")
                .format(mysqlTimeFormat),
              to: moment()
                .subtract(1, "months")
                .format(mysqlTimeFormat),
            }
          }
        );
        const lastMonthResults = await sequelize.query(
          `SELECT count(amount) as amountCount
            FROM orders
            WHERE createdAt > :from
              AND createdAt < :to`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
              from: moment()
                .subtract(1, "months")
                .format(mysqlTimeFormat),
              to: moment().format(mysqlTimeFormat),
            }
          }
        );
        result.datasets[0].data.push(
          threeMonthAgoResults[0].amountCount
        );
        result.datasets[0].data.push(
          twoMonthAgoResults[0].amountCount
        );
        result.datasets[0].data.push(
          lastMonthResults[0].amountCount
        );
        return result;
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
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