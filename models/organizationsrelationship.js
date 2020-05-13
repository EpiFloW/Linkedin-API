'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationsRelationship = sequelize.define('OrganizationsRelationship', {
    OrganisationId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  OrganizationsRelationship.associate = function(models) {
    // associations can be defined here
  };
  return OrganizationsRelationship;
};
