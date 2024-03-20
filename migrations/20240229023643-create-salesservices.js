const { DataTypes } = require('sequelize');

module.exports = {
 up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SalesServices', {
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
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id'
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
      }
    });
 },
 down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SalesServices');
 }
};
