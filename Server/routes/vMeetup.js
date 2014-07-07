//var meetup = require('meetup-api')('291b5a6c1e4f4c49345a587c8203312');

var models;
var util = require('./Util');
var Lib = new util.Util(models);

var meetup= require('meetup-api')('5f162b4a1e6c18144031593436255d38');

// var mongoose = require('mongoose');
// var db = mongoose.connection;
// db.on('error', console.error);
// mongoose.connect('localhost', 'data');
// var models = require('./valueObjects')(mongoose);
///-------------------------------------------------------

function Meetup( _inject) {
 models=_inject;
}
///-------------------------------------------------------
function meetupError(error)
{
    console.dir('ErrorCode:'+error.code+' ErrorSetails:'+error.details+' ErrorProblem:'+error.problem );
}
Meetup.prototype.getEventsByLocation = function(location) {
	meetup.getOpenEvents(location, function(err,events) {
    if (err) meetupError(events);
	if (typeof events.results != 'undefined'){
		for (var i = 0; i < events.results.length; i++ ) {
					var ev = events.results[i];
					var _muChannel = new models.MeetupChannel({
					EventID:ev.id,
					EventName:ev.name,
					Description:ev.description,
					Event_hosts:ev.event_hosts,
					Event_url:ev.event_url,
					Photo_url:ev.photo_url,
					Venue:ev.venue,
					GroupName:ev.name,
					GroupID:ev.group.id,
					Distance:ev.distance,
					Created:ev.created,
					Updated:ev.updated,
					yes_rsvp_count:ev.yes_rsvp_count
				});
				Meetup.prototype.createMeetupChannel(_muChannel);
			}
		}
	});
}///-------------------------------------------------------
Meetup.prototype.createMeetupChannel= function (meetupChannel){
	models.MeetupChannel.find({ EventID: meetupChannel.EventID }, function(err, _found) {
	  if (err) return console.error(err);
	   if (_found.length > 0 ){ 
		  console.dir ('Found event '+ meetupChannel.EventID);
			 models.MeetupChannel.remove({EventID: meetupChannel.EventID}, function(err, _found) {
			 if (err) return console.error(err);
				meetupChannel.save(function(err, meetupChannel) {
				if (err) return console.error(err);
				// console.dir('Updated:[' + meetupChannel.EventID+'] '+meetupChannel.GroupName+'Hosted by:' +meetupChannel.Event_hosts);
				});				
			 });
		 }
		if (_found.length == 0 || typeof _found == 'undefined'){
			meetupChannel.save(function(err, meetupChannel) {
			if (err) return console.error(err);
			console.dir ('created event '+ meetupChannel.EventID);
			 });	
		 }
	}).limit(1);
}
///-------------------------------------------------------
Meetup.prototype.createMeetupMember= function (schmMeetupMember){
	models.MeetupMember.find({ id: schmMeetupMember.id }, function(err, _found) {
	  if (err) return console.error(err);
	   if (_found.length > 0 ){ 
		  console.dir ('FOUND and REMOVED MeetupMember '+ schmMeetupMember.id);
			 models.MeetupMember.remove({id: schmMeetupMember.id}, function(err, _found) {
			 if (err) return console.error(err);
				schmMeetupMember.save(function(err, schmMeetupMember) {
				if (err) return console.error(err);
				 console.dir('UPDATED:[' + schmMeetupMember.id+'] ');
				});				
			 });
		 }
		if (_found.length == 0 || typeof _found == 'undefined'){
			schmMeetupMember.save(function(err, schmMeetupMember) {
			if (err) return console.error(err);
			console.dir ('CREATED MeetupMember '+ schmMeetupMember.id);
			 });	
		 }
	}).limit(1);
}
///-------------------------------------------------------
Meetup.prototype.GetUser=function(fields) {
	meetup.getMembers(fields,function(err,member) {
		if (err) meetupError(member);
			if (typeof member != 'undefined'){
				var _MeetupMember=Lib.mapToUser(member.results[0]).MeetupMember;
				Meetup.prototype.createMeetupMember(_MeetupMember);
			}
		});
}

///-------------------------------------------------------
module.exports = {"Meetup" : Meetup};
///-------------------------------------------------------