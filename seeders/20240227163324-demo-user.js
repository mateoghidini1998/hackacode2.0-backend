const { faker } = require('@faker-js/faker/locale/en');
const bcrypt = require('bcryptjs');

'use strict';

module.exports = {
 async up (queryInterface, Sequelize) {
    var dummyJSON = [];
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);
    for(var i = 0; i < 30; i++){
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gotravel.com`;
      const role = i < 2 ? 'admin' : 'employee';
      dummyJSON.push({
        id: i + 1,
        email: email,
        password: hash,
        role: role,
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
