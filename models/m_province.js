'use strict';
module.exports = (sequelize, DataTypes) => {
  const m_province = sequelize.define('m_province', {
    name: DataTypes.STRING
  }, {});
  m_province.associate = function(models) {
    // associations can be defined here
  };
  return m_province;
};