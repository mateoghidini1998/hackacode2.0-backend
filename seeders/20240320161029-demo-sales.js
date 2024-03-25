'use strict';

const { faker } = require('@faker-js/faker/locale/en');
const Employee = require('../models/Employee.model');
const Customer = require('../models/Customer.model');
const Service = require('../models/Service.model');
const Sale = require('../models/Sale.model');
const SalesServices = require('../models/SalesServices.model');

module.exports = {
 up: async (queryInterface, Sequelize) => {

    function getRandomDate(from, to) {
      from = from.getTime();
      to = to.getTime();
      return new Date(from + Math.random() * (to - from));
    }

    const paymentMethods = ['ewallet', 'debit', 'credit', 'cash', 'transfer'];
    const employees = await Employee.findAll();
    const customers = await Customer.findAll();
    
    const dummyJSON = [];
    employees.forEach(employee => {
      // Especificar cuántas ventas debe tener cada empleado
      const salesCount = employee.id === 1 ? 0 : (employee.id === 7 ? 5 : Math.floor(Math.random() * 10));

      for (let i = 0; i < salesCount; i++) {
        const fromDate = new Date('2020-01-01');
        const toDate = new Date('2025-01-01');
        const randomDate = getRandomDate(fromDate, toDate);
        const randomPaymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

        // Seleccionar un cliente aleatorio para la venta
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];

        dummyJSON.push({
          employee_id: employee.id,
          customer_id: randomCustomer.id,
          payment_method: randomPaymentMethod,
          createdAt: randomDate,
        });
      }
    });

    await queryInterface.bulkDelete('Sales', null, {});
    await queryInterface.bulkInsert('Sales', dummyJSON, {});

 },
 down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sales', null, {});
 }
};
