'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    models.Post.hasMany(models.Comment);
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Post;
};
