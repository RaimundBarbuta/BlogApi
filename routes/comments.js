var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

// define and setup Mongoose
// connect to the db
mongoose.connect('mongodb://cubu:mancarica@ds235388.mlab.com:35388/blogbd')
// create a schema for the
var Schema = mongoose.Schema;

var comments = new Schema ({
  blogID: String,
  commentID: String,
  userID: String,
  content: String,
  date: String
});

var CommentModel = mongoose.model('Comment', comments);

/* routes handlers */
// ######### Diplays BLOG POST INFOs ##########
router.get('/', function(req, res, next) {
  if(req.query.commentID){
    CommentModel.findOne({userID: req.query.commentID}, function(err, comment){
      res.json(comment);
    });
  }else{
    CommentModel.find({}, function(err, comments){
      res.json(comments);
      console.log(comments);
    });
  }

});
// ########REGISTER NEW comments######
router.post('/', function(req, res, next) {
  var comments = new CommentModel ({
    blogID: req.body.blogID,
    commentID: uuidv4(),
    userID: req.body.userID,
    content: req.body.content,
    date: Date.now()
  });
  comments.save(function(err){
    if(err){
      res.send('NOOOOOOO!');
      console.log(err);
    }else{
      res.send('Comment Created!');
    }
  });
});

router.put('/', function(req, res, next) {
  var query = {
    commentID: req.body.commentID
    }
    var updatedUser = ({
      commentID: req.body.commentID,
      userID: req.body.userID,
      content: req.body.content,
      date: Date.now()
    });
  CommentModel.update(query, updatedUser, function(err, user){
    if(err){
      res.send('NOOOOOO!')
    }else{
      res.send('Comment Updated!');
    }
  });
});

router.delete('/', function(req, res, next) {
  var query = {
    commentID: req.body.commentID
  }
  CommentModel.deleteOne(query, function(err, user){
    if(err){
      res.send('NOOOOOO!')
    }else{
      res.send('Comment Deleted!');
    }
  });
});

module.exports = router;
