'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
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
