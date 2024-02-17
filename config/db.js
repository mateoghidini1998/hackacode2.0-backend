const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'hackacode2.0',
 'root',
 '',
 {
   host: 'localhost',
   dialect: 'mysql'
 }
);

module.exports = sequelize;