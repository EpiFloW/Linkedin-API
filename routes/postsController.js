var models    = require('../models');
var asyncLib  = require('async');
var jwtUtils = require('../utils/jwt.utils');

module.exports = {
  create: function(req, res) {
    var headerAuth  = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    var content = req.body.content;

    if (userId == null || content == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          models.Post.create({
            content: content,
            UserId: userFound.id
          })
          .then(function(newPost) {
            done(newPost);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newPost){
      if (newPost){
        return res.status(200).json({'id':newPost.id});
      }else{
        return res.status(404).json({'error':'cannot add user'});
      }
    });
  },

  delete: function(req, res){
    var postId = req.body.postId;

    if (postId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.Post.findOne({
          attributes: ['id'],
          where: {id: postId}
        })
        .then(function(post){
          done(null, post);
        })
        .catch(function(err){
          return res.status(500).json({'error':'unable to verify post'});
        })
      },
      function(post, done){
        if (post){
          post.destroy();
        }
      }
    ], function(post){
      if (post){
        return res.status(201).json(post);
      }else{
        return res.status(500).json({'error':'cannot delete post'});
      }
    });
  },

  edit: function(req, res){
    var postId = req.body.postId;
    var content = req.body.content;

    if (postId == null || content == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.Post.findOne({
          attributes: ['postId', 'content'],
          where: {postId: postId}
        })
        .then(function(post){
          done(null, post);
        })
        .catch(function(err){
          return res.return(500).json({'error':'unable to verify post'});
        })
      }, function(post, done){
        if (post){
          post.update({
            content: (content ? content : post.content)
          })
          .then(function(){
            done(post);
          })
          .catch(function(err){
            res.return(500).json({'error':'cannot update post'});
          })
        }else{
          res.status(404).json({'error':'post not found'});
        }
      }
    ], function(post){
      if (post){
        return res.status(201).json(post);
      }else{
        return res.status(500).json({'error':'cannot update post'});
      }
    })
  },

  getPosts: function(req, res){
    var fields = req.query.fields;
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    var order = req.query.order;
    var search = req.query.search;

    if (search == null){
      models.Post.findAll({
        order: [(order != null) ? order.split(':') : ['createdDate', 'DESC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNan(offset)) ? offset : null,
        include: [{
          model: models.Post,
          attributes: ['content', 'postId', 'userId']
        }]
      })
      .then(function(posts){
        if (posts){
          res.status(200).json(posts);
        }else{
          res.status(404).json({'error':'no posts found'});
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
