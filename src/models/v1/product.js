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

    /**
     * @param {string} query
     * @param {number} page
     * @param {number} perPage
     * @returns {object|false}
     */
    static async searchAdminProducts(
      query = null,
      page = 1,
      perPage = 7,
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
          data: this.getFormattedProductsData(
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
            WHERE name LIKE :query OR
              units LIKE :query OR
              weight LIKE :query OR
              price LIKE :query OR
              createdAt LIKE :query OR
              updatedAt LIKE :query
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
            WHERE name LIKE :query OR
              units LIKE :query OR
              weight LIKE :query OR
              price LIKE :query OR
              createdAt LIKE :query OR
              updatedAt LIKE :query
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
          data: this.getFormattedProductsData(
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
     * @returns {array}
     */
    static getFormattedProductsData(products) {
      return products.map(product =>
        this.getFormattedProductData(product)
      );
    }

    /**
     * @param {object} product
     * @returns {array}
     */
    static getFormattedProductData(product) {
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        units: product.units,
        weight: product.weight,
        categoriesId: product.categoriesId,
        price: "£"+(Math.round((product.price + Number.EPSILON) * 100) / 100)
          .toFixed(2),
        description: product.description,
        manufacturersId: product.manufacturersId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
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
            WHERE slug = :slug`,
          {
            type: sequelize.QueryTypes.SELECT,
            replacements: { slug },
          },
        );

        if (0 === result.length) {
          return false;
        }
        
        return this.getFormattedProductData(result[0]);
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