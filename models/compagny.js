'use strict';
module.exports = (sequelize, DataTypes) => {
  const Compagny = sequelize.define('Compagny', {
    name: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Compagny.associate = function(models) {
    // associations can be defined here
  };
  return Compagny;
};