'use strict';
module.exports = (sequelize, DataTypes) => {
  const m_admin = sequelize.define('m_admin', {
    name: DataTypes.STRING
  }, {});
  m_admin.associate = function(models) {
    // associations can be defined here
  };
  return m_admin;
};