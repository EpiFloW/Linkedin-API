var express = require('express');
var usersController = require('./routes/usersController');
var commentsController = require('./routes/commentsController');
var postsController = require('./routes/postsController');

exports.router = (function(){
  var apiRouter = express.Router();

  // Users
  apiRouter.route('/users/register').post(usersController.register);
  apiRouter.route('/users/login').post(usersController.login);
  apiRouter.route('/users/get').get(usersController.getUserProfile);
  apiRouter.route('/users/update').put(usersController.updateUserProfile);

  // Posts
  apiRouter.route('/posts/create').post(postsController.create);
  apiRouter.route('/posts/delete').delete(postsController.delete);
  apiRouter.route('/posts/edit').put(postsController.edit);

  // Comments
  apiRouter.route('/comments/create').post(commentsController.create);
  apiRouter.route('/comments/delete').delete(commentsController.delete);
  apiRouter.route('/comments/edit').put(commentsController.edit);

  // Schools

  // Organizations

  // OrganizationsRelationship

  // SchoolsRelationship

  // UsersRelationship

  return apiRouter;
})();
