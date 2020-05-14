var models    = require('../models');
var asyncLib  = require('async');

module.exports = {
  create: function(req, res){
    var userId1 = req.body.userId1;
    var userId2 = req.body.userId2;

    if (userId1 == null || userId2 == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        var newUsersRelationship = models.UsersRelationship.create({
          userId1: userId1,
          userId2: userId2
        })
        .this(function(newUsersRelationship){
          done(newUsersRelationship);
        })
        .catch(function(err){
          return res.status(500).json({'error':'cannot add users relationship'});
        })
      }
    ], function(err){
      if (!err){
        return res.status(200).json({'msg':'ok'});
      }else{
        return res.status(404).json({'error':'error'});
      }
    });
  },

  delete: function(req, res){
    var usersRelationshipId = req.body.usersRelationshipId;

    if (usersRelationshipId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.UsersRelationship.findOne({
          attributes: ['id'],
          where: {id: usersRelationshipId}
        })
        .then(function(usersRelationship){
          done(null, schoolRelationship);
        })
        .catch(function(err){
          return res.status(500).json({'error':'unable to verify usersRelationship'});
        })
      },
      function(usersRelationship, done){
        if (usersRelationship){
          usersRelationship.destroy();
        }
      }
    ], function(usersRelationship){
      if (usersRelationship){
        return res.status(201).json(usersRelationship);
      }else{
        return res.status(500).json({'error':'cannot delete usersRelationship'});
      }
    });
  },

  getUsersRelationship: function(req, res){
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var search = req.query.search;

    if (search == null){
      models.UsersRelationship.findAll({
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNan(offset)) ? offset : null,
        include: [{
          model: models.UsersRelationship,
          attributes: ['userId1', 'userId2']
        }]
      })
      .then(function(usersRelationship){
        if (usersRelationship){
          res.status(200).json(usersRelationship);
        }else{
          res.status(404).json({'error':'no users relationship found'});
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
