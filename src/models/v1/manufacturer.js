'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * @param {number} manufacturerId
     */
    static async getProductManufacturer(manufacturerId) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE id = :manufacturerId`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { manufacturerId },
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return this.getFormattedManufacturerData(
          result[0],
        );
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }
    static getFormattedManufacturerData(
      manufacturer,
    ) {
      return {
        id: manufacturer.id,
        description: manufacturer.description,
        name: manufacturer.name,
        createdAt: manufacturer.createdAt,
        updatedAt: manufacturer.updatedAt,
      };
    }
  }
  manufacturer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
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
    modelName: 'manufacturer',
    tableName: "manufacturers",
  });
  return manufacturer;
};