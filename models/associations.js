const User = require('./User.model');
const Employee = require('./Employee.model');

User.hasOne(Employee, { foreignKey: 'user_id', as: 'Employee' });
Employee.belongsTo(User, { foreignKey: 'user_id', as: 'User' });