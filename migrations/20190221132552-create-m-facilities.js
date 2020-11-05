'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_facilities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: Sequelize.TIME,
      updatedAt: Sequelize.TIME,
      isDeleted: Sequelize.BOOLEAN,
    }, {
      paranoid: true,
      timestamps: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('m_facilities');
  }
};