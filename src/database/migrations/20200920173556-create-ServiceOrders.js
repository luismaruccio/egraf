'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('serviceOrders', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      client: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clients',
          key: 'id'          
        }
      },
      user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'          
        }
      },
      requestDate: {
        type: Sequelize.DATE,
      },
      deliveryDate :{
        type: Sequelize.DATE,
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sostatus',
          key: 'id'          
        }
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
    return queryInterface.dropTable('serviceOrders');
  }
};
