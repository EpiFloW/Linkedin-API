'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    country: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    relations: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    //models.User.hasMany(models.User);
  };
  return User;
};