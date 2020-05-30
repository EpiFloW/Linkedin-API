var express = require('express');
var usersController = require('./routes/usersController');
var commentsController = require('./routes/commentsController');
var postsController = require('./routes/postsController');
var schoolsController = require('./routes/schoolsController');
var organizationsController = require('./routes/organizationsController');
var organizationsRelationshipController = require('./routes/organizationsRelationshipController');
var schoolsRelationshipController = require('./routes/schoolsRelationshipController');
var usersRelationshipController = require('./routes/usersRelationshipController');

exports.router = (function(){
  var apiRouter = express.Router();

  // Users
  apiRouter.route('/users/register').post(usersController.register);
  apiRouter.route('/users/login').get(usersController.login);
  apiRouter.route('/users/get').get(usersController.getUserProfile);
  apiRouter.route('/users/update').put(usersController.updateUserProfile);
  apiRouter.route('/users/list').get(usersController.getUsers);

  // Posts
  apiRouter.route('/posts/create').post(postsController.create);
  apiRouter.route('/posts/delete').delete(postsController.delete);
  apiRouter.route('/posts/edit').put(postsController.edit);
  apiRouter.route('posts/list').get(postsController.getPosts);

  // Comments
  apiRouter.route('/comments/create').post(commentsController.create);
  apiRouter.route('/comments/delete').delete(commentsController.delete);
  apiRouter.route('/comments/edit').put(commentsController.edit);
  apiRouter.route('/comments/list').get(commentsController.getComments);

  // Schools
  apiRouter.route('/schools/create').post(schoolsController.create);
  apiRouter.route('/schools/delete').delete(schoolsController.delete);
  apiRouter.route('/schools/list').get(schoolsController.getSchools);

  // Organizations
  apiRouter.route('/organizations/create').post(organizationsController.create);
  apiRouter.route('/organizations/delete').delete(organizationsController.delete);
  apiRouter.route('/organizations/list').get(organizationsController.getOrganizations);

  // OrganizationsRelationship
  apiRouter.route('/organizations/createLink').post(organizationsRelationshipController.create);
  apiRouter.route('/organizations/deletelink').delete(organizationsRelationshipController.delete);
  //apiRouter.route('/organizations/getlinksorganization').get();
  //apiRouter.route('/organizations/getlinksuser').get();

  // SchoolsRelationship
  apiRouter.route('/schools/createLink').post(schoolsRelationshipController.create);
  apiRouter.route('/schools/deletelink').delete(schoolsRelationshipController.delete);
  //apiRouter.route('/schools/getlinksschool').get();
  //apiRouter.route('/schools/getlinksuser').get();

  // UsersRelationship
  apiRouter.route('/users/createLink').post(usersRelationshipController.create);
  apiRouter.route('/schools/deletelink').delete(usersRelationshipController.delete);
  apiRouter.route('/users/getlinks').get(usersRelationshipController.getUsersRelationship);

  return apiRouter;
})();
