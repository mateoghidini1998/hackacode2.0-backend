'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
          type: Sequelize.INTEGER,
          references: {
              model: 'Employees',
              key: 'id'
          },
          required: true,
          allowNull: false,
      },
      customer_id: {
          type: Sequelize.INTEGER,
          references: {
              model: 'Customers',
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
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sales');
  }
};
