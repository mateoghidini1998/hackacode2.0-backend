const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'employees',
            key: 'id'
        },
        required: true,
        allowNull: false,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'customers',
            key: 'id'
        },
        required: true,
        allowNull: false,
    },
    payment_method: {
        type: Sequelize.ENUM('ewallet', 'debit', 'credit', 'cash', 'transfer'),
        allowNull: false
    },
    profit: {
        type: Sequelize.FLOAT,
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

module.exports = Sale;