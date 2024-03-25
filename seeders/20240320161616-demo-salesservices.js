const { faker } = require('@faker-js/faker/locale/en');
const Sale = require('../models/Sale.model');
const Service = require('../models/Service.model');
const { QueryTypes } = require('sequelize');

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

    const updateQuery = `
      UPDATE Sales 
      SET profit = COALESCE(
          (SELECT SUM(Services.price) 
          FROM SalesServices 
          JOIN Services ON SalesServices.service_id = Services.id 
          WHERE SalesServices.sale_id = Sales.id), 0
      );
    `;
    await queryInterface.sequelize.query(updateQuery, { type: QueryTypes.UPDATE });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SalesServices', null, {});
  }
};
