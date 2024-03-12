const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SaleService = sequelize.define('SaleService', {
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
    }
}, {
    tableName: 'SaleService', 
    timestamps: false, 
});

module.exports = SaleService;
