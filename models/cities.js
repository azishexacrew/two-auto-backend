const Sequelize = require('sequelize');
const Provinces = require('../models/provinces');
const db = require('../db');
const Cities = db.define('m_cities', {
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
}, {
  paranoid: true,
  timestamps: true,
});

Cities.belongsTo(Provinces, {
  foreignKey: 'province_id'
});

Cities.sync();

module.exports = Cities;