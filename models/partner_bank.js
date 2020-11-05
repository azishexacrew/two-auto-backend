const Sequelize = require('sequelize');
const db = require('../db');
const Partner = require('../models/partner');
const Partner_bank = db.define('m_partner_bank', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bank_name: {
    type: Sequelize.STRING,
  },
  account_number: {
    type: Sequelize.STRING,
  },
  account_name: {
    type: Sequelize.STRING,
  },
  document_file: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.TIME,
  updatedAt: Sequelize.TIME,
  isDeleted: Sequelize.BOOLEAN,
}, {
  paranoid: true,
  timestamps: true,
});

Partner_bank.belongsTo(Partner, {
  foreignKey: 'partner_id',
  require: true
});

Partner_bank.sync();

module.exports = Partner_bank;