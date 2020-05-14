var models    = require('../models');
var asyncLib  = require('async');

module.exports = {
  create: function(req, res){
    var organizationId = req.body.organizationId;
    var userId = req.body.userId;

    if (organizationId == null || userId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        var newOrganizationRelationship = models.OrganizationsRelationship.create({
          organizationId: organizationId,
          userId: userId
        })
        .this(function(newOrganizationRelationship){
          done(newOrganizationRelationship);
        })
        .catch(function(err){
          return res.status(500).json({'error':'cannot add organization relationship'});
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
    var organizationsRelationshipId = req.body.organizationsRelationshipId;

    if (organizationsRelationshipId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.OrganizationsRelationship.findOne({
          attributes: ['id'],
          where: {id: organizationsRelationshipId}
        })
        .then(function(organizationRelationship){
          done(null, organizationRelationship);
        })
        .catch(function(err){
          return res.status(500).json({'error':'unable to verify organizationRelationship'});
        })
      },
      function(organizationRelationship, done){
        if (organizationRelationship){
          organizationRelationship.destroy();
        }
      }
    ], function(organizationRelationship){
      if (organizationRelationship){
        return res.status(201).json(organizationRelationship);
      }else{
        return res.status(500).json({'error':'cannot delete organizationRelationship'});
      }
    });
  }
}
