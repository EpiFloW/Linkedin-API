'use strict';
module.exports = (sequelize, DataTypes) => {
  const SchoolsRelationship = sequelize.define('SchoolsRelationship', {
    SchoolId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  SchoolsRelationship.associate = function(models) {
    // associations can be defined here
  };
  return SchoolsRelationship;
};