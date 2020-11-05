const Sequelize = require('sequelize');
const Countries = require('../models/countries');
const db = require('../db');
const Provinces = db.define('m_provinces', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.TIME,
  updatedAt: Sequelize.TIME,
  isDeleted: Sequelize.BOOLEAN,
}, {
  paranoid: true,
  timestamps: true,
});

Provinces.belongsTo(Countries, {
  foreignKey: 'country_id',
  require: true
});

Provinces.sync();

module.exports = Provinces;