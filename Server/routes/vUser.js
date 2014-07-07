
var models;
var util = require('./Util');
var Lib = new util.Util(models);
function User(_inject){models=_inject;}

User.prototype.createUser= function (schmUser){
	models.User.find({ _id: schmUser._id }, function(err, _found) {
	  if (err) return console.error(err);
	   if (_found.length > 0 ){ 
		  console.dir ('FOUND and REMOVEd User '+ schmUser.id);
			 models.User.remove({id: schmUser.id}, function(err, _found) {
			 if (err) return console.error(err);
				schmUser.save(function(err, schmUser) {
				if (err) return console.error(err);
				 console.dir('UPDATED:[' + schmUser.id+'] ');
				});				
			 });
		 }
		if (_found.length == 0 || typeof _found == 'undefined'){
			schmUser.save(function(err, schmUser) {
			if (err) return console.error(err);
			console.dir ('CREATED User '+ schmUser.id);
			 });	
		 }
	}).limit(1);
}

module.exports = {"User" : User};