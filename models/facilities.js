const Sequelize = require('sequelize');
const Partner_workshop = require('../models/partner_workshop');
const db = require('../db');
const Facilities = db.define('m_facilities', {
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

Facilities.belongsTo(Partner_workshop, {
  foreignKey: 'workshop_id',
  require: true
});

Facilities.sync();

module.exports = Facilities;