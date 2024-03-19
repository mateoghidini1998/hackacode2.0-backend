const { faker } = require('@faker-js/faker/locale/en');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    function generateDni(){
      const dni = faker.string.numeric(8);
      return dni;
    }

    const dummyJSON = [];
    for(var i =  0 ; i <  10 ; i++){
      dummyJSON.push({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        birthdate: faker.date.past(),
        country: faker.location.country(),
        dni: generateDni(),
        email: faker.internet.email(),
      });
    }
    await queryInterface.bulkDelete('Customers', null, {});
    await queryInterface.bulkInsert('Customers', dummyJSON, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
