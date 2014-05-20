var meetup = require('meetup-api')('5f162b4a1e6c18144031593436255d38');
var mongoose = require('mongoose');
var db = mongoose.connection;

function Lib() {
}
Lib.prototype.GetEventList = function() {
}
db.on('error', console.error);
// db.once('open', function() {
// });

mongoose.connect('localhost', 'data');

var meetupChannel6 = new mongoose.Schema({
  EventID 	: String,
  GroupName : String,
  GroupID 	: String,
  Distance 	: String,
  Created 	: String,
  Updated 	: String
});
var MeetupChannel = mongoose.model('meetupChannel6', meetupChannel6);


Lib.prototype.GetEvents = function() {

	var _results=[];
	meetup.getOpenEvents({ 'lon' : '-118.420615799005' ,  'lat' : '34.04430982618546', 'radius' : '200' }, function(err,events) {
	for (var i = 0; i < events.results.length; i++ ) {
				var ev = events.results[i];
				var _muchannel = new MeetupChannel({
				EventID:ev.id,
				GroupName:ev.name,
				GroupID:ev.group.id,
				Distance:ev.distance,
				Created:ev.created,
				Updated:ev.updated
			});
			processEvents(_muchannel);
		}
	});
}

function processEvents(meetupChannel){
	MeetupChannel.find({ EventID: meetupChannel.EventID }, function(err, _found) {
	  if (err) return console.error(err);
	   if (_found.length > 0 ){ /
		 console.log ('found event');
			 MeetupChannel.remove({EventID: meetupChannel.EventID}, function(err, _found) {
			 if (err) return console.error(err);
				meetupChannel.save(function(err, meetupChannel) {
				if (err) return console.error(err);
				   console.dir('Updated:[' + meetupChannel.EventID+'] '+meetupChannel.GroupName);
				});				
			 });
		 }
		if (_found.length == 0 ){
			meetupChannel.save(function(err, meetupChannel) {
			if (err) return console.error(err);
			 console.dir('New Channel Saved:[' + meetupChannel.EventID+'] '+meetupChannel.GroupName);
			 });	
		 }
	}).limit(1);
}
module.exports = {"Lib" : Lib};
