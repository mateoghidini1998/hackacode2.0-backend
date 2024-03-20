const { faker } = require('@faker-js/faker/locale/en');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    function generateDni(){
      const dni = faker.string.numeric(8)
      return dni;
    }

    const dummyJSON = [];
    for(var i =  0 ; i <  10 ; i++){
      dummyJSON.push({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        address: faker.location.streetAddress(),
        dni: generateDni(),
        email: faker.internet.email(),
        birthdate: faker.date.past(),
        country: faker.location.country(),
        phone: faker.phone.number(),
      });
    }
    await queryInterface.bulkDelete('Customers', null, {});
    await queryInterface.bulkInsert('Customers', dummyJSON, {});
    console.log(dummyJSON)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
