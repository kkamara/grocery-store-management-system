'use strict';
const moment = require("moment-timezone");
const { faker, } = require('@faker-js/faker');
const slugify = require("slugify");
const { mysqlTimeFormat, } = require("../../utils/time");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      for (let i = 0; i < 30; i++) {
        const category = await queryInterface.sequelize.query(
          "SELECT id FROM categories ORDER BY rand() LIMIT 1",
          { type: Sequelize.QueryTypes.SELECT, transaction },
        );

        if (0 === category.length) {
          throw new Error("No categories are available to select.");
        }

        const manufacturer = await queryInterface.sequelize.query(
          "SELECT id FROM manufacturers ORDER BY rand() LIMIT 1",
          { type: Sequelize.QueryTypes.SELECT, transaction },
        );

        if (0 === manufacturer.length) {
          throw new Error("No manufacturers are available to select.");
        }

        let productCreatedAt = null;
        if (0 === faker.number.int({ min: 0, max: 1, })) {
          productCreatedAt = moment().utc().subtract(
            faker.number.int({ min: 1, max: 5, }),
            "weeks",
          ).format(mysqlTimeFormat);
        } else {
          productCreatedAt = moment().utc().subtract(
            faker.number.int({ min: 1, max: 5, }),
            "months",
          ).format(mysqlTimeFormat);
        }

        const productName = faker.commerce.productName();
        const productSlug = slugify(productName);
        const productInsertResult = await queryInterface.sequelize.query(
          `INSERT INTO products(name, slug, units, weight, categoriesId, price, description, manufacturersId, isLive, createdAt, updatedAt)
            VALUES (:name, :slug, :units, :weight, :categoriesId, :price, :description, :manufacturersId, :isLive, :createdAt, :updatedAt)`,
          {
            replacements: {
              name: productName,
              slug: productSlug,
              units: faker.number.int({ min: 0, max: 1000, }),
              weight: faker.number.int({ min: 0, max: 100, }) + " kg",
              categoriesId: category[0].id,
              price: faker.number.float({ min: 0.1, max: 200, }),
              description: faker.number.int({ min: 0, max: 1, }) == 1 ?
                faker.lorem.paragraphs({ min: 1, max: 3, }, "\n") :
                null,
              manufacturersId: manufacturer[0].id,
              isLive: 1,
              createdAt: productCreatedAt,
              updatedAt: productCreatedAt,
            },
            type: Sequelize.QueryTypes.INSERT,
            transaction,
          }
        );

        const photos = [
          {
            name: "pizza-6948995_1280.webp",
            path: "public/images/productPhotos/pizza-6948995_1280.webp",
            type: "image/webp",
          },
          {
            name: "apples-2243734_1280.jpg",
            path: "public/images/productPhotos/apples-2243734_1280.jpg",
            type: "image/jpg",
          },
          {
            name: "dairy-5621769_1280.webp",
            path: "public/images/productPhotos/dairy-5621769_1280.webp",
            type: "image/webp",
          },
        ];

        const productsId = productInsertResult[0];
        for (const photo of photos) {
          await queryInterface.sequelize.query(
            `INSERT INTO productPhotos(productsId, name, path, type, createdAt, updatedAt)
              VALUES (:productsId, :name, :path, :type, :createdAt, :updatedAt)`,
            {
              replacements: {
                name: photo.name,
                path: photo.path,
                type: photo.type,
                createdAt: moment().utc().format(mysqlTimeFormat),
                updatedAt: moment().utc().format(mysqlTimeFormat),
                productsId,
              },
              type: Sequelize.QueryTypes.INSERT,
              transaction,
            }
          );
        }
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('productPhotos', null, { transaction, });
      await queryInterface.bulkDelete('products', null, { transaction, });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
