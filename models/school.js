'use strict';
module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define('School', {
    SchoolId: DataTypes.INTEGER,
    Country: DataTypes.STRING,
    Sector: DataTypes.STRING,
    Name: DataTypes.STRING
  }, {});
  School.associate = function(models) {
    // associations can be defined here
  };
  return School;
};