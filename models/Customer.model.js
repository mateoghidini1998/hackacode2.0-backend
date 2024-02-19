const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname:{ 
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dni: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    country: {
        type: Sequelize.STRING,
        allowNull:false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
});


module.exports = Customer;