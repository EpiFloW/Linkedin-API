'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationsRelationship = sequelize.define('OrganizationsRelationship', {
    organisationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  OrganizationsRelationship.associate = function(models) {
    // associations can be defined here
  };
  return OrganizationsRelationship;
};
