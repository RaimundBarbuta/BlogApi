var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

// define and setup Mongoose
// connect to the db
mongoose.connect('mongodb://****:*********@ds235388.mlab.com:35388/blogbd')
// create a schema for the
var Schema = mongoose.Schema;

var blogPost = new Schema ({
  blogID: String,
  authorID: String,
  blogTitle: String,
  date: Date,
  content: String,
  headerImage: String
});

var BlogModel = mongoose.model('Post', blogPost);

/* routes handlers */
// ######### Diplays BLOG POST INFOs ##########
router.get('/', function(req, res, next) {
  if(req.query.blogID){
    BlogModel.findOne({blogID: req.query.blogID}, function(err, blogpost){
      res.json(blogpost);
    });
  }else{
    BlogModel.find({}, function(err, blogposts){
      res.json(blogposts);
      console.log(blogposts);
    });
  }

});
// ########POST NEW BLOGS######
router.post('/', function(req, res, next) {
  var newPost = new BlogModel ({
    blogID: uuidv4(),
    authorID: req.body.authorID,
    blogTitle: req.body.blogTitle,
    date: Date.now(),
    content: req.body.content,
    headerImage: req.body.headerImage
  });
  newPost.save(function(err){
    if(err){
      res.send('NOT UOKE!');
      console.log(err);
    }else{
      res.send('UOKE!');
    }
  });
});

router.put('/', function(req, res, next) {
  var query = {
    blogID: req.body.blogID
    }
  var updatedPost = ({
    blogID: req.body.blogID,
    authorID: req.body.authorID,
    blogTitle: req.body.blogTitle,
    date: Date.now(),
    content: req.body.content,
    headerImage: req.body.headerImage
  });
  BlogModel.update(query, updatedPost, function(err, blogpost){
    if(err){
      res.send('NOOOOOO!')
    }else{
      res.json(blogpost);
    }
  });
});

router.delete('/', function(req, res, next) {
  var query = {
    blogID: req.body.blogID
  }
  BlogModel.deleteOne(query, function(err, blogpost){
    if(err){
      res.send('NOOOOOO!')
    }else{
      res.json(blogpost);
    }
  });
});

module.exports = router;
