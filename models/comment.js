'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.STRING,
    post: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    /*models.Comment.belongsTo(models.post), {
      foreignKey: {
        allowNull: false
      }
    }*/
  };
  return Comment;
};