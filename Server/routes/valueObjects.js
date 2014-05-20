var mongoose = require('mongoose');
var testIlya='ilyaTest';

var messageSchema = mongoose.Schema({
	fromUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
	toUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
	//channel : { type: mongoose.Schema.Types.ObjectId , ref: 'channels' },
	message : String,
	timestamp : { type: Date, default: Date.now }
	
});

var userSchema = mongoose.Schema({
  avatar : String,
  cover  : String,
  firstName: String,
  lastName : String,
  title : String,
  bio 	: String,
  email : String,
  device : String,
  pushId : String,
  subscriptions : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channels' }],
  timestamp : { type: Date, default: Date.now },
  settings : String,
  loc: []
});

var channelPostSchema = mongoose.Schema({
  ownerId : String,
  channel : { type: mongoose.Schema.Types.ObjectId , ref: 'channels' },
  content : {},
  color : String,
  type : { type : Number, default : 0 },
  pin : String,
  image : String,
  sound : String,
  fileUrl : String,
  timestamp : { type: Date, default: Date.now }
});

var channelPost = mongoose.model('channelPosts' , channelPostSchema);

var User = mongoose.model('users' , userSchema);
var Message = mongoose.model('messages' , messageSchema);