const Sequelize = require('sequelize');

const db = require('../db');

const Admin = db.define('m_admin', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    //allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    //allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  isDeleted: Sequelize.TINYINT,
});

Admin.sync();

module.exports = Admin;
