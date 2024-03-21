const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'hackacode2.0',
 'root',
 '',
 {
   host: 'localhost',
   dialect: 'mysql',
   logging: console.log,
   insecureAuth: true 
 }
);

module.exports = sequelize;