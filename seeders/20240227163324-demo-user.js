const { faker } = require('@faker-js/faker/locale/en');
const bcrypt = require('bcryptjs');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    var dummyJSON = [];
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);
    for(var i =  0 ; i <  30 ; i++){
      dummyJSON.push({
        id: i + 1,
        email: faker.internet.email(),
        password: hash,
        createdAt : new Date(),
        updatedAt : new Date()
      });
    }
    await queryInterface.bulkDelete('Employees', null, {});
    await queryInterface.bulkDelete('Users', null, {});

    await queryInterface.bulkInsert('Users', dummyJSON, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
