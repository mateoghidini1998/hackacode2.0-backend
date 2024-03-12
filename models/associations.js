const User = require('./User.model');
const Employee = require('./Employee.model');
const Sale = require('./Sale.model');
const Service = require('./Service.model');

Sale.belongsToMany(Service, { through: 'Sale_Service', onDelete: 'CASCADE' });
Service.belongsToMany(Sale, { through: 'Sale_Service', onDelete: 'CASCADE' });
User.hasOne(Employee, { foreignKey: 'user_id', as: 'Employee', onDelete: 'CASCADE' });
Employee.belongsTo(User, { foreignKey: 'user_id', as: 'User', onDelete: 'CASCADE' });


module.exports = { User, Employee, Sale, Service };