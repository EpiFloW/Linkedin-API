var bcrypt    = require('bcrypt');
var jwtUtils  = require('../utils/jwt.utils');
var models    = require('../models');
var asyncLib  = require('async');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
  register: function(req, res) {

    var email     = req.body.email;
    var name      = req.body.name;
    var surname   = req.body.surname
    var password  = req.body.password;

    if (email == null || name == null || surname == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 'error': 'email is not valid' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['Email'],
          where: { Email: email }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (!userFound) {
          bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
            done(null, userFound, bcryptedPassword);
          });
        } else {
          return res.status(409).json({ 'error': 'user already exist' });
        }
      },
      function(userFound, bcryptedPassword, done) {
        var newUser = models.User.create({
          Email: email,
          Name: name,
          Surname: surname,
          Password: bcryptedPassword,
          isBanned: 0,
          isAdmin: 0
        })
        .then(function(newUser) {
          done(newUser);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'cannot add user' });
        });
      }
    ], function(newUser) {
      if (newUser) {
        return res.status(201).json({
          'id': newUser.id
        });
      } else {
        return res.status(500).json({ 'error': 'cannot add user' });
      }
    });
  },

  login: function(req, res){
    var email = req.body.email;
    var pasword = req.body.password;

    if (email == null || password == null){
      return res.status(400).json({'error':'missing parameters'});
    }
    asyncLib.waterfall([
      function(done){
        models.User.findOne({
          where: {email: email}
        })
        .then(function(userFound){
          done(null, userFound);
        })
        .catch(function(err){
          return res.status(500).json({'error':'unable to verify user'});
        })
      },
      function(userFound, done){
        if (userFound){
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
            done(null, userFound, resBycrypt);
          });
        }else{
          return res.status(404).json({'error':'user not exist in DB'});
        }
      },
      function(userFound, resBycrypt, done){
        if (resBycrypt){
          done(userFound);
        }else{
          return res.status(403).json({'error':'invalid password'});
        }
      }
    ], function(userFound){
      if (userFound){
        return res.status(201).json({
          'userId': userFound.id,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      }else{
        return res.status(500).json({'error':'cannot log on user'});
      }
    });
  },

    getUserProfile: function(req, res){
      var headerAuth = req.headers['authorization'];
      var userId = jwtUtils.getUserId(headerAuth);

      if (userId < 0)
        return res.status(400).json({'error':'wrong token'});

      models.User.findOne({
        attributes: ['id', 'email', 'surname', 'name', 'age', 'profilePicture', 'country'],
        where: {id: userId}
      }).then(function(user){
        if (user){
          res.status(201).json(user);
        }else{
          res.status(404).json({'error':'user not found'});
        }
      }).catch(function(err){
        res.status(500).json({'error':'cannot fetch user'});
      })
    },

    updateUserProfile: function(req, res){
      var headerAuth = req.header['authorization'];
      var userId = jwtUtils.getUserId(headerAuth);

      var country = req.body.country;

      asyncLib.waterfall([
        function(done){
          models.User.findOne({
            attributes : ['id', 'country'],
            where: {id: userId}
          })
          .then(function(userFound){
            done(null, userFound);
          })
          .catch(function(err){
            return res.status(500).json({'error':'unable to verify user'});
          })
        },
        function(userFound, done){
          if (userFound){
            userFound.update({
              country: (country ? country : userFound.country)
            })
            .then(function(){
              done(userFound);
            })
            .catch(function(err){
              res.status(500).json({'error':'cannot update user'});
            })
          }else{
            res.status(404).json({'error':'user not found'});
          }
        }
      ], function(userFound){
        if (userFound){
          return res.status(201).json(userFound);
        }else{
          return res.status(500).json({'error':'cannot update user profile'});
        }
      });
  },

  getUsers: function(req, res){
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;
    var search = req.query.search;

    if (search == null){
      models.User.findAll({
        order: [(order != null) ? order.split(':') : ['name', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNan(offset)) ? offset : null,
        include: [{
          model: models.User,
          attributes: ['name']
        }]
      })
      .then(function(users){
        if (users){
          res.status(200).json(users);
        }else{
          res.status(404).json({'error':'no users found'});
        }
      })
      .catch(function(err){
        res.status(500).json({'error':'invalid fields'});
      });
    }else{
      //Get with search
    }
  }
}
