const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SalesServices = sequelize.define('SalesServices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'sales', 
            key: 'id'
        },
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'services',
            key: 'id'
        },
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
}, {
    tableName: 'SalesServices', 
    timestamps: false, 
});

module.exports = SalesServices;
