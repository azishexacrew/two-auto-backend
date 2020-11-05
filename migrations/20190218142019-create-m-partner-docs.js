'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('m_partner_docs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doc_type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      doc_file: {
        allowNull: true,
        type: Sequelize.STRING
      },
      npwp: {
        allowNull: true,
        type: Sequelize.STRING
      },
      npwp_file: {
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
    return queryInterface.dropTable('m_partner_docs');
  }
};