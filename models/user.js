const Sequelize = require('sequelize');

const db = require('../db');

const User = db.define('m_users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    //allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    // allowNull: false,
  },
  fullname: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  address: {
    type: Sequelize.TEXT,
    // allowNull: false,
  },
  point: {
    type: Sequelize.DOUBLE,
    // allowNull: false,
  },
  createdAt: Sequelize.TIME,
  updatedAt: Sequelize.TIME,
  isDeleted: Sequelize.BOOLEAN,
  active: Sequelize.BOOLEAN,
}, {
  paranoid: true,
  timestamps: true,
});

User.sync();



module.exports = User;