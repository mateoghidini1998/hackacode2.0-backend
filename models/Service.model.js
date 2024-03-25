const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    service_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true    
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true    
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
 
    },
    service_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(20,2),
        allowNull: false,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },    
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Service;