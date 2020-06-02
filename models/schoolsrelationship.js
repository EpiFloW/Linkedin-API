'use strict';
module.exports = (sequelize, DataTypes) => {
  const SchoolsRelationship = sequelize.define('SchoolsRelationship', {
    schoolId: DataTypes.INTEGER,
    //userId: DataTypes.INTEGER
  }, {});
  SchoolsRelationship.associate = function(models) {
    // associations can be defined here
  };
  return SchoolsRelationship;
};
