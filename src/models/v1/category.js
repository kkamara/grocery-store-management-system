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
     * @returns Object|false
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

    /**
     * @param {Object} category
     * @param {boolean} [getDescription=false]
     * @returns Object
     */
    static getFormattedCategoryData(
      category,
      getDescription = false,
    ) {
      const result = {
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
      if (true === getDescription) {
        result.description = category.description;
      }
      return result;
    }

    /**
     * @param {array} categories
     * @param {boolean} [getDescription=false]
     * @returns Object
     */
    static getFormattedCategoriesData(
      categories,
      getDescription = false,
    ) {
      return categories.map(category => 
        this.getFormattedCategoryData(category, false));
    }

    /**
     * @returns array|false
     */
    static async getCategories() {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}`,
          {
            type: sequelize.QueryTypes.SELECT,
          },
        );
        
        return this.getFormattedCategoriesData(
          result,
          false,
        );
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
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