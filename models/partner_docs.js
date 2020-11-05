const Sequelize = require('sequelize');
const db = require('../db');
const Partner = require('../models/partner');
const Partner_docs = db.define('m_partner_docs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doc_type: {
    type: Sequelize.STRING,
  },
  doc_file: {
    type: Sequelize.STRING,
  },
  npwp_file: {
    type: Sequelize.STRING,
  },
  npwp: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.TIME,
  updatedAt: Sequelize.TIME,
  isDeleted: Sequelize.BOOLEAN,
}, {
  paranoid: true,
  timestamps: true,
});

Partner_docs.belongsTo(Partner, {
  foreignKey: 'partner_id',
  require: true
});

Partner_docs.sync();

module.exports = Partner_docs;