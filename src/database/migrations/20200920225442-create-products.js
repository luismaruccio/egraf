'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      isService :{
        type: Sequelize.INTEGER,
      },
      price :{
        type: Sequelize.DECIMAL,
      },
      quantity :{
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
    return queryInterface.dropTable('products');
  }
};
