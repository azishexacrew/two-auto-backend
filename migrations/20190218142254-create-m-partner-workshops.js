'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_partner_workshops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      openAt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      closeAt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      day_pattern: {
        allowNull: true,
        type: Sequelize.STRING
      },
      rating: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      latitude: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      longitude: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      address: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      image_url: {
        allowNull: true,
        type: Sequelize.STRING
      },
      partner_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'm_partners',
          key: 'id'
        },
      },
      City_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'm_cities',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('m_partner_workshops');
  }
};