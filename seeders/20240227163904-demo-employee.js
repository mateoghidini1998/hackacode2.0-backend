const { faker } = require('@faker-js/faker/locale/en');
const User = require('../models/User.model');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    function generateDni(){
      const dni = faker.string.numeric(8);
      return dni;
    }

    const users = await User.findAll();
    const maxUserId = users.length;

    const dummyJSON = [];
    for(var i =  0 ; i <  maxUserId ; i++){
      dummyJSON.push({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        birthdate: faker.date.past(),
        country: faker.location.country(),
        dni: generateDni(),
        position: faker.person.jobTitle(),
        salary: faker.string.numeric(4),
        //for createdAt value
        createdAt: new Date(),
        user_id: users[i].id
      });
    }
    await queryInterface.bulkDelete('Employees', null, {});
    await queryInterface.bulkInsert('Employees', dummyJSON, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
