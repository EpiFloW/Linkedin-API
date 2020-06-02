'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
  //  models.Post.hasMany(models.Comment, {foreignKey: 'Comment'});
  models.Post.belongsTo(models.User, {
  foreignKey: {
      allowNull: false
    }
  })
  };
  return Post;
};
