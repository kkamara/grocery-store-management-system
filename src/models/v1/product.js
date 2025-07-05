'use strict';
const {
  Model
} = require('sequelize');
const { nodeEnv, } = require('../../config');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
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
    static async getAdminProductCountStat() {
      try {
        const result = await sequelize.query(
          `SELECT count(id) as count
            FROM ${this.getTableName()}`,
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
  product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    units: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.STRING
    },
    categoriesId: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.FLOAT
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    manufacturersId: {
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
    modelName: 'product',
    tableName: "products",
  });
  return product;
};