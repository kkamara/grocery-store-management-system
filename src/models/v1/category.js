'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * @param {number} categoryId
     */
    static async getProductCategory(categoryId) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE id = :categoryId`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { categoryId },
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return this.getFormattedCategoryData(
          result[0],
        );
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }
    static getFormattedCategoryData(
      category,
    ) {
      return {
        id: category.id,
        description: category.description,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
    }
  }
  category.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    name: {
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
    modelName: 'category',
    tableName: "categories",
  });
  return category;
};