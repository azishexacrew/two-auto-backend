'use strict';
module.exports = (sequelize, DataTypes) => {
  const m_city = sequelize.define('m_city', {
    name: DataTypes.STRING
  }, {});
  m_city.associate = function(models) {
    // associations can be defined here
  };
  return m_city;
};