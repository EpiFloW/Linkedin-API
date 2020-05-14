var models    = require('../models');
var asyncLib  = require('async');

module.exports = {
  create: function(req, res){
    var schoolId = req.body.schoolId;
    var userId = req.body.userId;

    if (schoolId == null || userId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        var newSchoolRelationship = models.SchoolsRelationship.create({
          schoolId: schoolId,
          userId: userId
        })
        .this(function(newSchoolRelationship){
          done(newSchoolRelationship);
        })
        .catch(function(err){
          return res.status(500).json({'error':'cannot add school relationship'});
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
    var schoolRelationshipId = req.body.schoolRelationshipId;

    if (schoolRelationshipId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.SchoolsRelationship.findOne({
          attributes: ['id'],
          where: {id: schoolRelationshipId}
        })
        .then(function(schoolRelationship){
          done(null, schoolRelationship);
        })
        .catch(function(err){
          return res.status(500).json({'error':'unable to verify schoolRelationship'});
        })
      },
      function(schoolRelationship, done){
        if (schoolRelationship){
          schoolRelationship.destroy();
        }
      }
    ], function(schoolRelationship){
      if (schoolRelationship){
        return res.status(201).json(schoolRelationship);
      }else{
        return res.status(500).json({'error':'cannot delete schoolRelationship'});
      }
    });
  }
}
