
var models;
var util = require('./Util');
var Lib = new util.Util(models);


function Channel(_inject){models=_inject;}

Channel.prototype.createChannel= function (schmChannel){
	models.Channel.find({ _id: schmChannel._id }, function(err, _found) {
	  if (err) return console.error(err);
	   if (_found.length > 0 ){ 
		  console.dir ('FOUND and REMOVED Channel '+ schmChannel.id);
			 models.Channel.remove({id: schmChannel.id}, function(err, _found) {
			 if (err) return console.error(err);
				schmChannel.save(function(err, schmChannel) {
				if (err) return console.error(err);
				 console.dir('UPDATED:[' + schmChannel.id+'] ');
				});				
			 });
		 }
		if (_found.length == 0 || typeof _found == 'undefined'){
			schmChannel.save(function(err, schmChannel) {
			if (err) return console.error(err);
			console.dir ('CREATED Channel ['+ schmChannel+']');
			 });	
		 }
	}).limit(1);
}
Channel.prototype.channelPost= function (schmChannelPost){
				schmChannelPost.save(function(err, schmChannelPost) {
				if (err) return console.error(err);
				 console.dir('New ChannelPost posted:[' + schmChannelPost.id+'] ');
				});				
}

module.exports = {"Channel" : Channel};