const { faker } = require('@faker-js/faker/locale/en');
const bcrypt = require('bcryptjs');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    var dummyJSON = [];
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);
    for(var i =  0 ; i <  10 ; i++){
      dummyJSON.push({
        id: i + 1,
        email: faker.internet.email(),
        password: hash,
        createdAt : new Date(),
        updatedAt : new Date()
      });
    }
    await queryInterface.bulkDelete('employees', null, {});
    await queryInterface.bulkDelete('users', null, {});

    await queryInterface.bulkInsert('users', dummyJSON, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
