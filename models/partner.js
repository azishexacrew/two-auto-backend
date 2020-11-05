const Sequelize = require('sequelize');
const db = require('../db');
const Cities = require('../models/cities');
const Partner = db.define('m_partner', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  passport: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.TEXT,
  },
  password: {
    type: Sequelize.STRING,
  },
  longitude: {
    type: Sequelize.DOUBLE,
  },
  latitude: {
    type: Sequelize.DOUBLE,
  },
  active: {
    type: Sequelize.BOOLEAN,
  },
  status: {
    type: Sequelize.STRING,
  },
  company_name: {
    type: Sequelize.STRING,
  },
  company_type: {
    type: Sequelize.STRING,
  },
  kyc_complete: {
    type: Sequelize.BOOLEAN,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
  },
  createdAt: Sequelize.TIME,
  updatedAt: Sequelize.TIME,
}, {
  paranoid: true,
  timestamps: true,
});

Partner.belongsTo(Cities, {
  foreignKey: 'city_id',
  require: true
});

Partner.sync();

module.exports = Partner;
