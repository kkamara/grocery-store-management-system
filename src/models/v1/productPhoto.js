'use strict';
const { renameSync, } = require("node:fs");
const {
  Model
} = require('sequelize');
const moment = require("moment-timezone");
const { appURL, nodeEnv, } = require("../../config/index");
const { fileSize, } = require('../../utils/file');
const { mysqlTimeFormat, } = require('../../utils/time');

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
     * @param {Object} photo
     * @returns {array}
     */
    static getFormattedProductPhotoData(photo) {
      return {
        id: photo.id,
        productsId: photo.productsId,
        name: photo.name,
        path: appURL+"/productPhotos/"+photo.name,
        type: photo.type,
        createdAt: photo.createdAt,
        updatedAt: photo.updatedAt,
      };
    }

    /**
     * @param {string} mimetype
     * @param {number} size - binary size
     */
    static getUploadPhotoError(mimetype, size) {
      if (null === mimetype.match(/(jpg|jpeg|png|webp)$/i)) {
        return "Product photo mimetype must match one of jpg, jpeg, png or webp.";
      }

      if (size > fileSize) {
        return "Product photo size must not exceed 3.5MB";
      }

      return false;
    }

    /**
     * @param {string} from - Relavive path
     * @param {string} to - Relative path
     */
    static moveUploadedPhotoToPublicDir(from, to) {
      renameSync(from, to);
    }

    /**
     * @param {number} productsId
     * @param {string} fileName
     * @param {string} path
     * @param {string} mimetype
     * @returns {object|false}
     */
    static async newProductPhoto(
      productsId,
      fileName,
      path,
      mimetype,
    ) {
      try {
        const result = await sequelize.query(
          `INSERT INTO ${this.getTableName()}(productsId, name, path, type, createdAt, updatedAt)
            VALUES(:productsId, :name, :path, :type, :createdAt, :updatedAt)`,
          {
            type: sequelize.QueryTypes.INSERT,
            replacements: {
              createdAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              name: fileName,
              type: mimetype,
              productsId,
              path,
            },
          },
        );

        return { productId: result[0] };
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }
    
    /**
     * @param {number} productId
     * @returns {object|false}
     */
    static async getFirstProductPhoto(productId) {
      try {
        const result = await sequelize.query(
          `SELECT productPhotos.*
            FROM ${this.getTableName()}
            WHERE productsId = :productId
            ORDER BY id ASC
            LIMIT 1`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { productId },
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return this.getFormattedProductPhotoData(result[0]);
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
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