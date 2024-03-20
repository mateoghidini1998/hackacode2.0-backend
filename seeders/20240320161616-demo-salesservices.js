const { faker } = require('@faker-js/faker/locale/en');
const Sale = require('../models/Sale.model');
const Service = require('../models/Service.model');

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sales = await Sale.findAll();
    const services = await Service.findAll();
    const maxSalesId = sales.length;

    const dummyJSON = [];
    for(var i = 0; i < maxSalesId; i++){
      const randomServiceIndex = Math.floor(Math.random() * services.length);
      const randomSaleIndex = Math.floor(Math.random() * sales.length);
      dummyJSON.push({
        sale_id: sales[randomSaleIndex].id,
        service_id: services[randomServiceIndex].id,
      });
    }
    await queryInterface.bulkDelete('SalesServices', null, {});
    await queryInterface.bulkInsert('SalesServices', dummyJSON, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SalesServices', null, {});
  }
};
