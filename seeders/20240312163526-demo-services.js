const { faker } = require('@faker-js/faker/locale/en');
const Service = require('../models/Service.model');
'use strict';

function memoizeUnique(callback) {
 let store = {};
 return function(...args) {
    let result;
    do {
      result = callback(...args);
      const key = JSON.stringify(args) + JSON.stringify(result);
      if (!store.hasOwnProperty(key)) {
        store[key] = result;
        break;
      }
    } while (true);
    return result;
 };
}

const uniqueUuid = memoizeUnique(faker.string.uuid);
const uniqueProduct = memoizeUnique(faker.commerce.product);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Customers', null, {});

    for(var i = 0; i < 10; i++){
      const service = await Service.create({
        service_code: uniqueUuid(),
        name: uniqueProduct(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        service_date: faker.date.future()
      })
    }

 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {});
 }
};
