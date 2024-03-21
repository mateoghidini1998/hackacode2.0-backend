const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'hackacode2.0',
 'root',
 'your_password',
 {
   host: 'hackacode2.0',
   dialect: 'mysql',
   logging: console.log
 }
);

module.exports = sequelize;