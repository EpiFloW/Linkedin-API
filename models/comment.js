'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.STRING,
  }, {});
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    })
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Comment;
};
