const User = require('./User.model');
const Employee = require('./Employee.model');
const Sale = require('./Sale.model');
const Service = require('./Service.model');

Sale.belongsToMany(Service, { 
    through: 'SalesServices', 
    as:'services', 
    onDelete: 'CASCADE' 
});

Service.belongsToMany(Sale, { 
    through: 'SalesServices', 
    as:'sales', 
    onDelete: 'CASCADE' 
});

User.hasOne(Employee, { 
    foreignKey: 'user_id', 
    as: 'Employee', 
    onDelete: 'CASCADE' 
});

Employee.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'User', 
    onDelete: 'CASCADE' 
});


module.exports = { User, Employee, Sale, Service };