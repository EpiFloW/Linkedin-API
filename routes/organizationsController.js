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
        var newOrganization = models.Organization.create({
          coutry: country,
          sector: sector,
          name: name
        })
        .this(function(newOrganization){
          done(newOrganization);
        })
        .catch(function(err){
          return res.status(500).json({'error':'cannot add organization'});
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
    var organizationId = req.body.organizationId;

    if (organizationId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.Organization.findOne({
          attributes: ['id'],
          where: {id: organizationId}
        } )
        .then(function(organization){
          done(null, organization);
        })
        .catch(function(err){
          return res.status(500).json({'error':'unable to verify organization'});
        })
      },
      function(organization, done){
        if (organization){
          organization.destroy();
        }
      }
    ], function(organization){
      if (organization){
        return res.status(201).json(organization);
      }else{
        return res.status(500).json({'error':'cannot delete organization'});
      }
    });
  },

  getOrganizations: function(req, res) {
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;
    var search = req.query.search;

    if (search == null){
      models.Organization.findAll({
        order: [(order != null) ? order.split(':') : ['name', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNan(offset)) ? offset : null,
        include: [{
          model: models.Organization,
          attributes: ['name', 'sector', 'country']
        }]
      })
      .then(function(organizations){
        if (organizations){
          res.status(200).json(organizations);
        }else{
          res.status(404).json({'error':'no organizations found'});
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
