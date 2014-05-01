var mongoose = require('mongoose');
var _ = require('underscore');

function Users() {
	//mongoose.connect('localhost', 'data');
	//mongoose = db;
}


// var userSchema = mongoose.Schema({
//   name: String,
//   autojoin : Boolean,
//   device : String,
//   email : String,
//   subscriptions : [],
//   loc: []
// });
// 
// var User = mongoose.model('users', userSchema);

/*
create
delete
post
subscribe
unsubscribe
broadcast??

*/



Users.prototype.index = function(req, res){
  res.send("here is a list of users");
};

Users.prototype.create = function(req, res){
	
	var d = req.body;

	if (!d.autojoin)
		d.type = true;
		
	if (!d.loc)
		throw {message : "location is required" , code : 102 };
	else
		d.loc = [ parseFloat(d.loc[0]), parseFloat(d.loc[1]) ];

	if (!d.email)
		d.email = "test@bontebox.com";
	
    new User(d).save(function(err , user) {

      console.log('saved #' + ':\t' + d.name);
	  
  	  res.send(user);
	
    })
	
	
};

Users.prototype.delete = function(req, res){
	
	var d = req.body;
	
	User.findOneAndRemove ( {_id : d._id } , function (err, result) {

		  if (err) 
		  	throw err;
		  
		  console.log(result);

		  res.send(result);
		  
	});
};

Users.prototype.find = function(req, res){
  //res.send("finding a Users");
  
  var d = req.body;
  
  User.findOne({ _id : d._id }, function (err, result) {
		  //if (err) return handleError(err);
		  console.log(result);
		   // Space Ghost is a talk show host.
		  res.send(result);
	});
  
};

Users.prototype.index = function(req, res){
  res.send("here is a list of Users");
};

module.exports = Users;
