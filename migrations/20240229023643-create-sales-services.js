const { DataTypes } = require('sequelize');

module.exports = {
 up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SaleServices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sales',
          key: 'id'
        },
        primaryKey: true
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id'
        },
        primaryKey: true
      }
    });
 },
 down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SaleServices');
 }
};
