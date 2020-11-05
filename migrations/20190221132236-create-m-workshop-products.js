'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_workshop_products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      workshop_id: {
        type: Sequelize.INTEGER
      },
      products_id: {
        type: Sequelize.INTEGER
      },
      createdAt: Sequelize.TIME,
      updatedAt: Sequelize.TIME
    }, {
      timestamps: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('m_workshop_products');
  }
};