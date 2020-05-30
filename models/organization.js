'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    organizationId: DataTypes.INTEGER,
    count: DataTypes.STRING,
    sector: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
  };
  return Organization;
};
