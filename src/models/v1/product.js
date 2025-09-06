'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment-timezone");
const slugify = require("slugify");
const { nodeEnv, appTimezone, } = require('../../config');
const { mysqlTimeFormat, } = require('../../utils/time');
const { integerNumberRegex, numberWithOptionalDecimalPartRegex, } = require('../../utils/regexes');
const { roundTo2DecimalNumbers } = require('../../utils/numbers');

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
            FROM ${this.getTableName()}
            WHERE deletedAt IS NULL`,
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
     * @param {string} query
     * @param {number} page
     * @param {number} perPage
     * @param {boolean} [options.singlePhoto=false] options.singlePhoto
     * @returns {object|false}
     */
    static async searchAdminProducts(
      query = null,
      page = 1,
      perPage = 7,
      options,
    ) {
      if (null !== query) {
        return this.queryAdminProducts(query, page, perPage)
      }
      page -= 1;
      const offset = page * perPage;
      try {
        const countResult = await sequelize.query(
          `SELECT count(id) as total
            FROM ${this.getTableName()}
            WHERE deletedAt IS NULL
          `,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        );
        
        if (0 === countResult[0].total) {
          page += 1;
          return {
            data: [],
            meta: {
              currentPage: page,
              items: countResult[0].total,
              pages: 0,
              perPage,
            },
          }
        }

        const coreResults = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE deletedAt IS NULL
            ORDER BY id DESC
            LIMIT :perPage
            OFFSET :offset
          `,
          {
            replacements: { offset, perPage, },
            type: sequelize.QueryTypes.SELECT,
          }
        );
        
        page += 1;
        return {
          data: await this.getFormattedProductsData(
            coreResults,
            options,
          ),
          meta: {
            currentPage: page,
            items: countResult[0].total,
            pages: Math.ceil(countResult[0].total / perPage),
            perPage,
          },
        }
      } catch (err) {
        if ('production' !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {string} query
     * @param {number} page
     * @param {number} perPage
     * @param {boolean} [options.singlePhoto=false] options.singlePhoto
     * @returns {object|false}
     */
    static async searchProducts(
      query = null,
      page = 1,
      perPage = 7,
      options,
    ) {
      if (null !== query) {
        return this.queryProducts(query, page, perPage)
      }
      page -= 1;
      const offset = page * perPage;
      try {
        const countResult = await sequelize.query(
          `SELECT count(id) as total
            FROM ${this.getTableName()}
            WHERE deletedAt IS NULL AND isLive = 1
          `,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        );
        
        if (0 === countResult[0].total) {
          page += 1;
          return {
            data: [],
            meta: {
              currentPage: page,
              items: countResult[0].total,
              pages: 0,
              perPage,
            },
          }
        }

        const coreResults = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE deletedAt IS NULL AND isLive = 1
            ORDER BY id DESC
            LIMIT :perPage
            OFFSET :offset
          `,
          {
            replacements: { offset, perPage, },
            type: sequelize.QueryTypes.SELECT,
          }
        );
        
        page += 1;
        return {
          data: await this.getFormattedProductsData(
            coreResults,
            options,
          ),
          meta: {
            currentPage: page,
            items: countResult[0].total,
            pages: Math.ceil(countResult[0].total / perPage),
            perPage,
          },
        }
      } catch (err) {
        if ('production' !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {string} query
     * @param {number} page
     * @param {number} perPage
     * @returns {object|false}
     */
    static async queryAdminProducts(
      query = null,
      page = 1,
      perPage = 7,
    ) {
      page -= 1;
      const offset = page * perPage;
      try {
        const countResult = await sequelize.query(
          `SELECT count(id) as total
            FROM ${this.getTableName()}
            WHERE (
              name LIKE :query OR
              units LIKE :query OR
              weight LIKE :query OR
              price LIKE :query OR
              isLive LIKE :query OR
              stripeProductId LIKE :query OR
              createdAt LIKE :query OR
              updatedAt LIKE :query
            );
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { query: `%${query}%` },
          }
        );
        
        if (0 === countResult[0].total) {
          page += 1;
          return {
            data: [],
            meta: {
              currentPage: page,
              items: countResult[0].total,
              pages: 0,
              perPage,
            },
          }
        }

        const coreResults = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE (
              name LIKE :query OR
              units LIKE :query OR
              weight LIKE :query OR
              price LIKE :query OR
              isLive LIKE :query OR
              stripeProductId LIKE :query OR
              createdAt LIKE :query OR
              updatedAt LIKE :query
            )
            ORDER BY id DESC
            LIMIT :perPage
            OFFSET :offset
          `,
          {
            replacements: {
              query: `%${query}%`,
              offset,
              perPage,
            },
            type: sequelize.QueryTypes.SELECT,
          }
        );
        
        page += 1;
        return {
          data: await this.getFormattedProductsData(
            coreResults
          ),
          meta: {
            currentPage: page,
            items: countResult[0].total,
            pages: Math.ceil(countResult[0].total / perPage),
            perPage,
          },
        }
      } catch (err) {
        if ('production' !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {string} query
     * @param {number} page
     * @param {number} perPage
     * @returns {object|false}
     */
    static async queryProducts(
      query = null,
      page = 1,
      perPage = 7,
    ) {
      page -= 1;
      const offset = page * perPage;
      try {
        const countResult = await sequelize.query(
          `SELECT count(id) as total
            FROM ${this.getTableName()}
            WHERE (
              name LIKE :query OR
              units LIKE :query OR
              weight LIKE :query OR
              price LIKE :query OR
            ) AND deletedAt IS NULL AND
              isLive = 1;
          `,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { query: `%${query}%` },
          }
        );
        
        if (0 === countResult[0].total) {
          page += 1;
          return {
            data: [],
            meta: {
              currentPage: page,
              items: countResult[0].total,
              pages: 0,
              perPage,
            },
          }
        }

        const coreResults = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE (
              name LIKE :query OR
              units LIKE :query OR
              weight LIKE :query OR
              price LIKE :query OR
            ) AND deletedAt IS NULL AND
              isLive = 1
            ORDER BY id DESC
            LIMIT :perPage
            OFFSET :offset
          `,
          {
            replacements: {
              query: `%${query}%`,
              offset,
              perPage,
            },
            type: sequelize.QueryTypes.SELECT,
          }
        );
        
        page += 1;
        return {
          data: await this.getFormattedProductsData(
            coreResults
          ),
          meta: {
            currentPage: page,
            items: countResult[0].total,
            pages: Math.ceil(countResult[0].total / perPage),
            perPage,
          },
        }
      } catch (err) {
        if ('production' !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {array} products
     * @param {boolean} [options.singlePhoto=false] options.singlePhoto
     * @returns {array}
     */
    static async getFormattedProductsData(products, options) {
      const result = [];
      for (const product of products) {
        result.push(
          await this.getFormattedProductData(product, options)
        );
      }
      return result;
    }

    /**
     * @param {Object} product
     * @param {Object} options
     * @param {boolean} [options.getCategory=false] options.getCategory
     * @param {boolean} [options.getManufacturer=false] options.getManufacturer
     * @param {boolean} [options.singlePhoto=false] options.singlePhoto
     * @param {boolean} [options.unformatted=false] options.unformatted
     * @returns {array}
     */
    static async getFormattedProductData(
      product,
      options,
    ) {
      const result = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        units: product.units,
        weight: product.weight,
        category: null,
        price: "£"+roundTo2DecimalNumbers(product.price),
        description: product.description,
        manufacturer: null,
        isLive: 1 === product.isLive,
        stripeProductId: product.stripeProductId,
        createdAt: moment(product.createdAt)
          .tz(appTimezone)
          .format(mysqlTimeFormat),
        updatedAt: moment(product.updatedAt)
          .tz(appTimezone)
          .format(mysqlTimeFormat),
      };
      if (options) {
        if (true === options.getCategory) {
          const category = await this.sequelize.models
            .category
            .getProductCategory(product.categoriesId);
          if (false !== category) {
            result.category = category;
          }
        }
        if (true === options.getManufacturer) {
          const manufacturer = await this.sequelize.models
            .manufacturer
            .getProductManufacturer(product.manufacturersId);
          if (false !== manufacturer) {
            result.manufacturer = manufacturer;
          }
        }
        if (true == options.singlePhoto) {
          const photo = await this.sequelize.models.productPhoto
            .getFirstProductPhoto(product.id);
          if (false !== photo) {
            result.photos = [photo];
          }
        }
        if (true === options.unformatted) {
          result.price = product.price;
          result.weight = product.weight.slice(
            0,
            product.weight.indexOf(" kg"),
          );
        }
      }
      return result;
    }

    /**
     * @param {string} slug
     * @returns {object|false}
     */
    static async getProductBySlug(slug) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE slug = :slug AND isLive = 1 AND deletedAt IS NULL`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { slug },
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return await this.getFormattedProductData(
          result[0],
          {
            getCategory: true,
            getManufacturer: true,
          }
        );
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {string} id
     * @returns {object|false}
     */
    static async getProduct(id, options) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE id = :id AND isLive = 1 AND deletedAt IS NULL`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id },
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return await this.getFormattedProductData(
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
     * @param {string} slug
     * @param {boolean} [options.unformatted=false] options.unformatted
     * @returns {object|false}
     */
    static async getAdminProductBySlug(slug, options) {
      try {
        const result = await sequelize.query(
          `SELECT *
            FROM ${this.getTableName()}
            WHERE slug = :slug AND deletedAt IS NULL`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { slug },
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return await this.getFormattedProductData(
          result[0],
          {
            getCategory: true,
            getManufacturer: true,
            unformatted: options && true === options.unformatted,
          }
        );
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {number} productId
     * @returns {boolean}
     */
    static async updateProductTimestamp(productId) {
      try {
        const result = await sequelize.query(
          `UPDATE ${this.getTableName()}
            SET updatedAt = :updatedAt
            WHERE id = :productId`,
          {
            replacements: {
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              productId,
            },
            type: sequelize.QueryTypes.UPDATE,
          },
        );
        const rowsUpdated = result[1];
        if (0 === rowsUpdated) {
          return false;
        }
        return true;
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {number} productId
     * @returns {boolean}
     */
    static async deleteProduct(productId) {
      try {
        const result = await sequelize.query(
          `UPDATE ${this.getTableName()}
            SET updatedAt = :updatedAt, deletedAt = :deletedAt
            WHERE id = :productId AND deletedAt IS NULL`,
          {
            replacements: {
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat), 
              deletedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              productId,
            },
            type: sequelize.QueryTypes.UPDATE,
          },
        );
        const rowsUpdated = result[1];
        if (0 === rowsUpdated) {
          return false;
        }
        return true;
      } catch(err) {
        if ("production" !== nodeEnv) {
          console.log(err);
        }
        return false;
      }
    }

    /**
     * @param {Object} payload
     */
    static async getNewProductError(payload) {
      if (!payload.name) {
        return "The name field is required.";
      } else if ("string" !== typeof payload.name) {
        return "The name field must be a string.";
      } else if (50 < payload.name.length) {
        return "The name field must be less than 51 characters.";
      } else {
        const nameExists = await this.getProductBySlug(
          slugify(payload.name),
        );
        if (false !== nameExists) {
          return "The name field is taken.";
        }
      }

      if (undefined === payload.units) {
        return "The units field is required.";
      } else if (null === `${payload.units}`.match(integerNumberRegex)) {
        return "The units field must be a number"
      }

      if (undefined === payload.weight) {
        return "The weight field is required.";
      } else if (null === `${payload.weight}`.match(numberWithOptionalDecimalPartRegex)) {
        return "The weight field must be a number"
      }

      if (undefined === payload.price) {
        return "The price field is required.";
      } else if (null === `${payload.price}`.match(numberWithOptionalDecimalPartRegex)) {
        return "The price field must be a number"
      }

      if (payload.description) {
        if ("string" !== typeof payload.description) {
          return "The description field must be a string.";
        } else if (1000 < payload.description.length) {
          return "The description field must be less than 1001 characters.";
        }
      }

      if (payload.category && Number(payload.category)) {
        if (null === `${payload.category}`.match(integerNumberRegex)) {
          return "The category field must be a valid integer.";
        }

        const foundCategory = await this.sequelize
          .models
          .category
          .getProductCategory(
            payload.category
          );
        if (false === foundCategory) {
          return "The category field was not found in our records.";
        }
      }

      if (payload.manufacturer && Number(payload.manufacturer)) {
        if (null === `${payload.manufacturer}`.match(integerNumberRegex)) {
          return "The manufacturer field must be a valid integer.";
        }

        const foundManufacturer = await this.sequelize
          .models
          .manufacturer
          .getProductManufacturer(
            payload.manufacturer
          );
        if (false === foundManufacturer) {
          return "The manufacturer field was not found in our records.";
        }
      }

      if (undefined === typeof payload.isLive) {
        return "The is live field is missing.";
      } else if (
        false !== payload.isLive &&
        true !== payload.isLive &&
        "false" !== payload.isLive &&
        "true" !== payload.isLive
      ) {
        return "The is live field must be true or false.";
      }

      if (payload.stripeProductId) {
        if ("string" !== typeof payload.stripeProductId) {
          return "The stripe product id field must be of type string."
        } else if (15 > payload.stripeProductId.length) {
          return "The stripe product id field length must be greater than 15 characters.";
        } else if (30 < payload.stripeProductId.length) {
          return "The stripe product id field length must not exceed 30 characters.";
        }
      }

      return false;
    }

    /**
     * @param {Object} payload
     * @param {Object} product
     */
    static async getUpdateProductError(payload, product) {
      if (!payload.name) {
        return "The name field is required.";
      } else if ("string" !== typeof payload.name) {
        return "The name field must be a string.";
      } else if (50 < payload.name.length) {
        return "The name field must be less than 51 characters.";
      } else {
        const newSlug = slugify(payload.name);
        if (newSlug !== product.slug) {
          const nameExists = await this.getProductBySlug(
            newSlug,
          );
          if (false !== nameExists) {
            return "The name field is taken.";
          }
        }
      }

      if (undefined === payload.units) {
        return "The units field is required.";
      } else if (null === `${payload.units}`.match(integerNumberRegex)) {
        return "The units field must be a number"
      }

      if (undefined === payload.weight) {
        return "The weight field is required.";
      } else if (null === `${payload.weight}`.match(numberWithOptionalDecimalPartRegex)) {
        return "The weight field must be a number"
      }

      if (undefined === payload.price) {
        return "The price field is required.";
      } else if (null === `${payload.price}`.match(numberWithOptionalDecimalPartRegex)) {
        return "The price field must be a number"
      }

      if (payload.description) {
        if ("string" !== typeof payload.description) {
          return "The description field must be a string.";
        } else if (1000 < payload.description.length) {
          return "The description field must be less than 1001 characters.";
        }
      }

      if (payload.category && Number(payload.category)) {
        if (null === `${payload.category}`.match(integerNumberRegex)) {
          return "The category field must be a valid integer.";
        }

        const foundCategory = await this.sequelize
          .models
          .category
          .getProductCategory(
            payload.category
          );
        if (false === foundCategory) {
          return "The category field was not found in our records.";
        }
      }

      if (payload.manufacturer && Number(payload.manufacturer)) {
        if (null === `${payload.manufacturer}`.match(integerNumberRegex)) {
          return "The manufacturer field must be a valid integer.";
        }

        const foundManufacturer = await this.sequelize
          .models
          .manufacturer
          .getProductManufacturer(
            payload.manufacturer
          );
        if (false === foundManufacturer) {
          return "The manufacturer field was not found in our records.";
        }
      }

      if (undefined === typeof payload.isLive) {
        return "The is live field is missing.";
      } else if (
        false !== payload.isLive &&
        true !== payload.isLive &&
        "false" !== payload.isLive &&
        "true" !== payload.isLive
      ) {
        return "The is live field must be true or false.";
      }
      
      if (payload.stripeProductId) {
        if ("string" !== typeof payload.stripeProductId) {
          return "The stripe product id field must be of type string."
        } else if (15 > payload.stripeProductId.length) {
          return "The stripe product id field length must be greater than 15 characters.";
        } else if (30 < payload.stripeProductId.length) {
          return "The stripe product id field length must not exceed 30 characters.";
        }
      }

      return false;
    }

    static getNewProductData(payload) {
      const result = {
        name: payload.name,
        units: payload.units,
        weight: payload.weight,
        price: payload.price,
        isLive: false,
      };
      if (payload.description) {
        result.description = payload.description;
      }
      if (payload.category) {
        result.category = payload.category;
      }
      if (payload.manufacturer) {
        result.manufacturer = payload.manufacturer;
      }
      if (undefined !== payload.isLive) {
        if (true === payload.isLive || "true" === payload.isLive) {
          result.isLive = true;
        }
      }
      if (payload.stripeProductId) {
        result.stripeProductId = payload.stripeProductId;
      }
      return result;
    }

    static getEditProductData(payload) {
      const result = {
        name: payload.name,
        units: payload.units,
        weight: payload.weight,
        price: payload.price,
        isLive: false,
      };
      if (payload.description) {
        result.description = payload.description;
      }
      if (payload.category) {
        result.category = payload.category;
      }
      if (payload.manufacturer) {
        result.manufacturer = payload.manufacturer;
      }
      if (undefined !== payload.isLive) {
        if (true === payload.isLive || "true" === payload.isLive) {
          result.isLive = true;
        }
      }
      if (payload.stripeProductId) {
        result.stripeProductId = payload.stripeProductId;
      }
      return result;
    }

    /**
     * @param {Object} data
     * @returns {object|false}
     */
    static async newProduct(data) {
      try {
        const result = await sequelize.query(
          `INSERT INTO ${this.getTableName()}(name, slug, units, weight, categoriesId, price, description, manufacturersId, isLive, stripeProductId, createdAt, updatedAt)
            VALUES(:name, :slug, :units, :weight, :categoriesId, :price, :description, :manufacturersId, :isLive, :stripeProductId, :createdAt, :updatedAt)`,
          {
            type: sequelize.QueryTypes.INSERT,
            replacements: {
              slug: slugify(data.name),
              name: data.name,
              units: data.units,
              weight: data.weight+" kg",
              price: data.price,
              description: data.description || null,
              categoriesId: data.category || null,
              manufacturersId: data.manufacturer || null,
              isLive: data.isLive,
              stripeProductId: data.stripeProductId || null,
              createdAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
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
     * @param {number} id
     * @param {Object} data
     * @returns {object|false}
     */
    static async updateProduct(id, data) {
      try {
        const result = await sequelize.query(
          `UPDATE ${this.getTableName()}
            SET name = :name,
              slug = :slug,
              units = :units,
              weight = :weight,
              categoriesId = :categoriesId,
              price = :price,
              description = :description,
              manufacturersId = :manufacturersId,
              isLive = :isLive,
              stripeProductId = :stripeProductId,
              updatedAt = :updatedAt
            WHERE id = :id`,
          {
            type: sequelize.QueryTypes.UPDATE,
            replacements: {
              slug: slugify(data.name),
              name: data.name,
              units: data.units,
              weight: data.weight+" kg",
              price: data.price,
              description: data.description || null,
              categoriesId: data.category || null,
              manufacturersId: data.manufacturer || null,
              isLive: data.isLive,
              stripeProductId: data.stripeProductId || null,
              updatedAt: moment()
                .utc()
                .format(mysqlTimeFormat),
              id,
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
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    manufacturersId: {
      type: DataTypes.INTEGER
    },
    isLive: {
      type: DataTypes.BOOLEAN
    },
    stripeProductId: {
      type: DataTypes.STRING,
      allowNull: true,
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