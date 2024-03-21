const { faker } = require('@faker-js/faker/locale/en');
const Employee = require('../models/Employee.model');
const Customer = require('../models/Customer.model');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    function getRandomDate(from, to) {
      from = from.getTime();
      to = to.getTime();
      return new Date(from + Math.random() * (to - from));
    }

    const employees = await Employee.findAll();
    const customers = await Customer.findAll();
    const maxEmployeeId = employees.length;
    const maxCustomerId = customers.length;
    
    const dummyJSON = [];
    for(var i =  0 ; i <  maxEmployeeId ; i++){
      const fromDate = new Date('2020-01-01');
      const toDate = new Date('2024-01-01');
      const randomDate = getRandomDate(fromDate, toDate);

      dummyJSON.push({
        employee_id: employees[i].id,
        customer_id: customers[i].id,
        createdAt: randomDate,
      });
    }
    await queryInterface.bulkDelete('sales', null, {});
    await queryInterface.bulkInsert('sales', dummyJSON, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  }
};

