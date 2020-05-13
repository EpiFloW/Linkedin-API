'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersRelationship = sequelize.define('UsersRelationship', {
    UserId1: DataTypes.INTEGER,
    UserId2: DataTypes.INTEGER,
    WaitingUser1: DataTypes.BOOLEAN,
    WaitingUser2: DataTypes.BOOLEAN
  }, {});
  UsersRelationship.associate = function(models) {
    // associations can be defined here
  };
  return UsersRelationship;
};