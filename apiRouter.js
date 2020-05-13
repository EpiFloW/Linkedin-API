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
  //apiRouter.route('/users/list').get();

  // Posts
  apiRouter.route('/posts/create').post(postsController.create);
  apiRouter.route('/posts/delete').delete(postsController.delete);
  apiRouter.route('/posts/edit').put(postsController.edit);
  //apiRouter.route('posts/list').get();

  // Comments
  apiRouter.route('/comments/create').post(commentsController.create);
  apiRouter.route('/comments/delete').delete(commentsController.delete);
  apiRouter.route('/comments/edit').put(commentsController.edit);
  //apiRouter.route('/comments/list').get();

  // Schools
  //apiRouter.route('/schools/create').post();
  //apiRouter.route('/schools/delete').delete();
  //apiRouter.route('/schools/edit').put();
  //apiRouter.route('/schools/list').get();

  // Organizations
  //apiRouter.route('/organizations/create').post();
  //apiRouter.route('/organizations/delete').delete();
  //apiRouter.route('/organizations/edit').put();
  //apiRouter.route('/organizations/list').get();

  // OrganizationsRelationship
  //apiRouter.route('/organizations/createLink').post();
  //apiRouter.route('/organizations/getlinksorganization');
  //apiRouter.route('/organizations/getlinksuser');
  //apiRouter.route('/organizations/deletelink');

  // SchoolsRelationship
  //apiRouter.route('/schools/createLink').post();
  //apiRouter.route('/schools/getlinksschool');
  //apiRouter.route('/schools/getlinksuser');
  //apiRouter.route('/schools/deletelink');

  // UsersRelationship
  //apiRouter.route('/users/createLink').post();
  //apiRouter.route('/users/getlinks');
  //apiRouter.route('/schools/deletelink');

  return apiRouter;
})();
