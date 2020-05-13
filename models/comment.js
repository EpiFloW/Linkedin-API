'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    CommentId: DataTypes.INTEGER,
    Content: DataTypes.STRING,
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Comment;
};
