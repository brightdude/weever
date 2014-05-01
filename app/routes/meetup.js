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

var event_hosts = new mongoose.Schema({
member_id: String, 
member_name: String
});

var venue = new mongoose.Schema({
address_1: String,
address_2: String,
address_3: String,
city_state_country: String,
lat_lon: String,
phone: String,
zip : String
});

var meetupChannel = new mongoose.Schema({
  EventID 	: String,
  Description : String,
  Event_hosts :[{ type: mongoose.Schema.Types.ObjectId , ref: 'event_hosts' }],
  Event_url : String,
  GroupName : String,
  GroupID 	: String,
  Distance 	: String,
  Venue		: [{ type: mongoose.Schema.Types.ObjectId , ref: 'venue' }],
  Created 	: String,
  Updated 	: String,
  yes_rsvp_count : String
});
var MeetupChannel = mongoose.model('meetupChannel', meetupChannel);


Lib.prototype.GetEvents = function() {

	var _results=[];
	meetup.getOpenEvents({ 'lon' : '-118.420615799005' ,  'lat' : '34.04430982618546', 'radius' : '200' }, function(err,events) {
	for (var i = 0; i < events.results.length; i++ ) {
				var ev = events.results[i];
				var _muchannel = new MeetupChannel({
				EventID:ev.id,
				Description:ev.description,
				Event_hosts:ev.event_hosts,
				Event_url:ev.event_url,
				Venue:ev.venue,
				GroupName:ev.name,
				GroupID:ev.group.id,
				Distance:ev.distance,
				Created:ev.created,
				Updated:ev.updated,
				yes_rsvp_count:ev.yes_rsvp_count
			});
			processEvents(_muchannel);
		}
	});
}

function processEvents(meetupChannel){
	MeetupChannel.find({ EventID: meetupChannel.EventID }, function(err, _found) {
	  if (err) return console.error(err);
	   if (_found.length > 0 ){ 
		 console.log ('found event');
			 MeetupChannel.remove({EventID: meetupChannel.EventID}, function(err, _found) {
			 if (err) return console.error(err);
				meetupChannel.save(function(err, meetupChannel) {
				if (err) return console.error(err);
				   //console.dir('Updated:[' + meetupChannel.EventID+'] '+meetupChannel.GroupName);
				   console.dir(meetupChannel);
				});				
			 });
		 }
		if (_found.length == 0 ){
			meetupChannel.save(function(err, meetupChannel) {
			if (err) return console.error(err);
			 //console.dir('New Channel Saved:[' + meetupChannel.EventID+'] '+meetupChannel.GroupName);
			 console.dir(meetupChannel);
			 });	
		 }
	}).limit(1);
}
module.exports = {"Lib" : Lib};
