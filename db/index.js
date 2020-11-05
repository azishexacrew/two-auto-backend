const Sequelize = require('sequelize');
const config = require('../config');

const { dbname, user, password, host, port } = config.database;


const db = new Sequelize(dbname, user, password, {
  host,
  port,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


module.exports = db;
