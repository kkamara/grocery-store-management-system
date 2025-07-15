'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
    /**
     * @param {number} productId
     * @returns {object|false}
     */
    static async getProductPhotos(productId) {
      try {
        const results = await sequelize.query(
          `SELECT productPhotos.*
            FROM ${this.getTableName()}
            WHERE productsId = :productId`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { productId },
          },
        );

        if (0 === results.length) {
          return false;
        }
        
        return this.getFormattedProductPhotosData(results);
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {array} productPhotos
     * @returns {array}
     */
    static getFormattedProductPhotosData(productPhotos) {
      return productPhotos.map(photo =>
        this.getFormattedProductPhotoData(photo)
      );
    }

    /**
     * @param {object} photo
     * @returns {array}
     */
    static getFormattedProductPhotoData(photo) {
      return {
        id: photo.id,
        productsId: photo.productsId,
        name: photo.name,
        path: "/productPhotos/"+photo.path,
        type: photo.type,
        createdAt: photo.createdAt,
        updatedAt: photo.updatedAt,
      };
    }
  }
  productPhoto.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productsId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.TEXT
    },
    type: {
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
    modelName: 'productPhoto',
    tableName: "productPhotos",
  });
  return productPhoto;
};