'use strict';
const {
  Model
} = require('sequelize');
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
     * @returns {object|false}
     */
    static async getAdminOngoingShipmentsCountStat() {
      try {
        const result = await sequelize.query(
          `SELECT count(id) as count
            FROM ${this.getTableName()}
            WHERE status IS NULL`,
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
  }
  shipping.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ordersId: {
      type: DataTypes.INTEGER,
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