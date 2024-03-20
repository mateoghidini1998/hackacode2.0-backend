const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User.model');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        required: true,
        allowNull: false,
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
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
});

module.exports = Employee;