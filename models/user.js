'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    isAdmin: DataTypes.BOOLEAN,
    isBanned: DataTypes.BOOLEAN,
    Name: DataTypes.STRING,
    Surname: DataTypes.STRING,
    Age: DataTypes.INTEGER,
    ProfilePicture: DataTypes.STRING,
    Country: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Post);
    models.User.hasMany(models.UsersRelationship);
    models.User.hasMany(models.OrganizationsRelationship);
    models.User.hasMany(models.SchoolsRelationship);
  };
  return User;
};
