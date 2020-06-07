'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    country: DataTypes.STRING,
    sector: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  School.associate = function(models) {
    // associations can be defined here
  };
  return School;
};
