var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

// define and setup Mongoose
// connect to the db
mongoose.connect('mongodb://cubu:mancarica@ds235388.mlab.com:35388/blogbd')
// create a schema for the
var Schema = mongoose.Schema;

var users = new Schema ({
  userID: String,
  name: String,
  author: Boolean,
  authorID: String,
  email: String,
  username: String
});

var UserModel = mongoose.model('User', users);

/* routes handlers */
// ######### Diplays BLOG POST INFOs ##########
router.get('/', function(req, res, next) {
  if(req.query.userID){
    UserModel.findOne({userID: req.query.userID}, function(err, user){
      res.json(user);
    });
  }else{
    UserModel.find({}, function(err, users){
      res.json(users);
      console.log(users);
    });
  }

});
// ########REGISTER NEW USERS######
router.post('/', function(req, res, next) {
  var users = new UserModel ({
    userID: uuidv4(),
    name: req.body.name,
    author: req.body.author,
    email: req.body.email,
    username: req.body.username
  });
  users.save(function(err){
    if(err){
      res.send('NOOOOOO');
      console.log(err);
    }else{
      res.send('User Created!');
    }
  });
});

router.put('/', function(req, res, next) {
  var query = {
    userID: req.body.userID
    }
    var updatedUser = ({
      userID: req.body.userID,
      name: req.body.name,
      author: req.body.author,
      email: req.body.email,
      username: req.body.username
    });
  UserModel.update(query, updatedUser, function(err, user){
    if(err){
      res.send('NOOOOOO!')
    }else{
      res.send('User Updated!');
    }
  });
});

router.delete('/', function(req, res, next) {
  var query = {
    userID: req.body.userID
  }
  UserModel.deleteOne(query, function(err, user){
    if(err){
      res.send('NOOOOOO!')
    }else{
      res.send('User Deleted!');
    }
  });
});

module.exports = router;
