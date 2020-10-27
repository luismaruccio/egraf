'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('soItens', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      serviceOrder: {
        type: Sequelize.INTEGER,
        references: {
          model: 'serviceOrders',
          key: 'id'          
        }
      },
      product: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'          
        }
      },
      quantity: {
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
    return queryInterface.dropTable('soItens');
  }
};
