const Sequelize = require('sequelize');
const db = require('../db');
const Partner = require('../models/partner');
const Cities = require('../models/cities');
const Partner_workshop = db.define('m_partner_workshop', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    underscored: true
  },
  name: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  openAt: {
    type: Sequelize.TIME,
  },
  closeAt: {
    type: Sequelize.TIME,
  },
  day_pattern: {
    type: Sequelize.STRING,
  },
  longitude: {
    type: Sequelize.DOUBLE,
  },
  latitude: {
    type: Sequelize.DOUBLE,
  },
  image_url: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
  createdAt: Sequelize.TIME,
  updatedAt: Sequelize.TIME,
  isDeleted: Sequelize.BOOLEAN,
}, {
  paranoid: true,
  timestamps: true,
});


Partner.hasMany(Partner_workshop, {
  foreignKey: 'partner_id',
  type: Sequelize.STRING,
  require: true
});

Partner_workshop.belongsTo(Partner, {
  foreignKey: 'partner_id',
  type: Sequelize.STRING,
  require: true
});

Partner_workshop.belongsTo(Cities, {
  foreignKey: 'city_id',
  require: true
});

Partner_workshop.sync();

module.exports = Partner_workshop;