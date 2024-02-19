const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    lastname:{ 
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    dni: {
        type: Sequelize.STRING,
    },
    birthdate: {
        type: Sequelize.DATE,
    },
    email: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salary: {
      type: Sequelize.FLOAT,
      allowNull: false,
    }
});

module.exports = Employee;