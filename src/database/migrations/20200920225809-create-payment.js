'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payment', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'          
        }
      },
      quantity: {
        type: Sequelize.STRING,
      },
      entryExit: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      serviceOrder: {
        type: Sequelize.INTEGER,
        references: {
          model: 'serviceOrders',
          key: 'id'          
        }
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      company: {
        type: Sequelize.INTEGER,
        references: {
          model: 'companys',
          key: 'id'          
        }
      },
      enable: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payment');
  }
};
