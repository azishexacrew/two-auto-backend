'use strict';
module.exports = (sequelize, DataTypes) => {
  const m_country = sequelize.define('m_country', {
    name: DataTypes.STRING
  }, {});
  m_country.associate = function(models) {
    // associations can be defined here
  };
  return m_country;
};