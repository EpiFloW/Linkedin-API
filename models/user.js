'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    isAdmin: DataTypes.BOOLEAN,
    isBanned: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    profilePicture: DataTypes.STRING,
    country: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Post);
    models.User.hasMany(models.Comment);
    models.User.hasMany(models.UsersRelationship);
    models.User.hasMany(models.OrganizationsRelationship);
    models.User.hasMany(models.SchoolsRelationship);
  };
  return User;
};
