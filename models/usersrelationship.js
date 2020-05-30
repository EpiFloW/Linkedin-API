'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersRelationship = sequelize.define('UsersRelationship', {
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER,
    waitingUser1: DataTypes.BOOLEAN,
    waitingUser2: DataTypes.BOOLEAN
  }, {});
  UsersRelationship.associate = function(models) {
    // associations can be defined here
  };
  return UsersRelationship;
};
