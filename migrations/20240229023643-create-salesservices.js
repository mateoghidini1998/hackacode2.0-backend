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
          model: 'Sales',
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
          model: 'Services',
          key: 'id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
    });
 },
 down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SalesServices');
 }
};
