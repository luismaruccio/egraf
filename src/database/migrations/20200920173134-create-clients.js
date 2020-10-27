'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      cpf :{
        type: Sequelize.STRING,
      },
      street :{
        type: Sequelize.STRING,
      },
      number :{
        type: Sequelize.STRING,
      },
      city :{
        type: Sequelize.STRING,
      },
      states :{
        type: Sequelize.STRING,
      },
      cpf :{
        type: Sequelize.STRING,
      },
      complement :{
        type: Sequelize.STRING,
      },
      tellNumber :{
        type: Sequelize.STRING,
      },
      email :{
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('clients');
  }
};
