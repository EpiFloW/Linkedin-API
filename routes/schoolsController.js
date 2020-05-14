var models    = require('../models');
var asyncLib  = require('async');

module.exports = {
  create: function(req, res){
    var country = req.body.country;
    var sector = req.body.sector;
    var name = req.body.name;

    if (country == null || sector == null || name == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        var newSchool = models.School.create({
          coutry: country,
          sector: sector,
          name: name
        })
        .this(function(newSchool){
          done(newSchool);
        })
        .catch(function(err){
          return res.status(500).json({'error':'cannot add school'});
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
    var schoolId = req.body.schoolId;

    if (schoolId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.School.findOne({
          attributes: ['id'],
          where: {id: schoolId}
        })
        .then(function(school){
          done(null, school);
        })
        .catch(function(err){
          return res.status(500).json({'error':'unable to verify school'});
        })
      },
      function(school, done){
        if (school){
          school.destroy();
        }
      }
    ], function(school){
      if (school){
        return res.status(201).json(school);
      }else{
        return res.status(500).json({'error':'cannot delete school'});
      }
    });
  },

  getSchools: function(req, res){
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;
    var search = req.query.search;

    if (search == null){
      models.School.findAll({
        order: [(order != null) ? order.split(':') : ['name', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNan(offset)) ? offset : null,
        include: [{
          model: models.School,
          attributes: ['name', 'sector', 'country']
        }]
      })
      .then(function(schools){
        if (schools){
          res.status(200).json(schools);
        }else{
          res.status(404).json({'error':'no schools found'});
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
