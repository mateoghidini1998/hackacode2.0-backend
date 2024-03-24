const { faker } = require('@faker-js/faker/locale/en');
const User = require('../models/User.model');

'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
    function generateDni(){
      const dni = faker.string.numeric(8);
      return dni;
    }

    const users = await User.findAll();
    const maxUserId = users.length;

    const dummyJSON = [];
    for(var i = 0; i < maxUserId; i++){
      const user = users[i];
      const emailParts = user.email.split('@');
      const firstName = emailParts[0].split('.')[0];
      const lastName = emailParts[0].split('.')[1];
      dummyJSON.push({
        name: firstName,
        lastname: lastName,
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        birthdate: faker.date.past(),
        country: faker.location.country(),
        dni: generateDni(),
        position: faker.person.jobTitle(),
        salary: faker.finance.amount(),
        user_id: user.id
      });
    }
    await queryInterface.bulkDelete('Employees', null, {});
    await queryInterface.bulkInsert('Employees', dummyJSON, {});
 },
 down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
 }
};
