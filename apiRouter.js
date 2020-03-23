var express = require('express');
var usersController = require('./routes/usersController');

exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.route('/users/register/').post(usersController.register);
    apiRouter.route('users/login/').post(usersController.login);

    return apiRouter;
});