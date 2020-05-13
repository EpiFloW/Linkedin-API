var models    = require('../models');
var asyncLib  = require('async');

module.exports = {
  create: function(req, res){
    var postId = req.body.postId;
    var userId = req.body.userId;
    var content = req.body.content;

    if (postId == null || userId == null || postId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        var newComment = models.Comment.create({
          postId: postId,
          userId: userId,
          content: content
        })
        .this(function(newComment){
          done(newComment);
        })
        .catch(function(err){
          return res.status(500).json({'error':'cannot add comment'});
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
    var commentId = req.body.commentId;

    if (commentId == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.Comment.findOne({
          attributes: ['id'],
          where: {id: commentId}
        })
        .then(function(comment){
          done(null, comment);
        })
        .catch(function(err){
          return res.status(500).json({'error':'unable to verify comment'});
        })
      },
      function(comment, done){
        if (comment){
          comment.destroy();
        }
      }
    ], function(comment){
      if (comment){
        return res.status(201).json(comment);
      }else{
        return res.status(500).json({'error':'cannot delete comment'});
      }
    });
  },

  edit: function(req, res){
    var commentId = req.body.commentId;
    var content = req.body.content;

    if (commentId == null || content == null){
      return res.status(400).json({'error':'missing parameters'});
    }

    asyncLib.waterfall([
      function(done){
        models.Comment.findOne({
          attributes: ['commentId', 'content'],
          where: {commentId: commentId}
        })
        .then(function(comment){
          done(null, comment);
        })
        .catch(function(err){
          return res.return(500).json({'error':'unable to verify comment'});
        })
      },
      function(comment, done){
        if (comment){
          comment.update({
            content: (content ? content : comment.content)
          })
          .then(function(){
            done(comment);
          })
          .catch(function(err){
            res.return(500).json({'error':'cannot update comment'})
          })
        }else{
          res.status(404).json({'error':'comment not found'});
        }
      }
    ], function(comment){
      if (comment){
        return res.status(201).json(comment);
      }else{
        return res.status(500).json({'error':'cannot update comment'});
      }
    });
  }
}
