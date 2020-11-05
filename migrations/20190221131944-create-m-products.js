'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING,
        //allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        //allowNull: false,
      },
      createdAt: Sequelize.TIME,
      updatedAt: Sequelize.TIME,
      deletedAt: Sequelize.TIME,
      isDeleted: Sequelize.BOOLEAN,
    }, {
      paranoid: true,
      timestamps: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('m_products');
  }
};
