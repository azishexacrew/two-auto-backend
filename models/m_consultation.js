'use strict';
module.exports = (sequelize, DataTypes) => {
  const m_consultation = sequelize.define('m_consultation', {
    name: DataTypes.STRING
  }, {});
  m_consultation.associate = function(models) {
    // associations can be defined here
  };
  return m_consultation;
};