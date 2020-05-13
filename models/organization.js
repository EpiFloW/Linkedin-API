'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    OrganizationId: DataTypes.INTEGER,
    Count: DataTypes.STRING,
    Sector: DataTypes.STRING,
    Name: DataTypes.STRING
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
  };
  return Organization;
};