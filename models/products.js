const Sequelize = require('sequelize');
const db = require('../db');
const Products = db.define('m_products', {
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
  isDeleted: Sequelize.BOOLEAN,
  deletedAt: Sequelize.TIME,
}, {
  paranoid: true,
  timestamps: true,
});

Products.sync();

module.exports = Products;