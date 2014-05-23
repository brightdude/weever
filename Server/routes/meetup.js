var meetup = require('meetup-api')('291b5a6c1e4f4c49345a587c8203312');
//var meetup= require('meetup-api')('5f162b4a1e6c18144031593436255d38');

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('localhost', 'data');
var models = require('./valueObjects')(mongoose);
///-------------------------------------------------------
function Meetup() {}
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
//				if (typeof ev.event_hosts != 'undefined') /* this will cause a throttle for a hour, must be done very carefully off line*/
//				{
//                    setTimeout(Meetup.prototype.GetUser({'member_id' : ev.event_hosts[0].member_id}), 3000);
				//}
				// Meetup.prototype.GetUser({'member_id' : _muChannel.Event_hosts.member_id});
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
			// console.dir('New Channel Saved:[' + meetupChannel.EventID+'] '+meetupChannel.GroupName+'Hosted by:' +meetupChannel.Event_hosts);
			 });	
		 }
	}).limit(1);
}
///-------------------------------------------------------
Meetup.prototype.createMeetupMember= function (meetupMember){
	models.MeetupMember.find({ id: meetupMember.id }, function(err, _found) {
	  if (err) return console.error(err);
	   if (_found.length > 0 ){ 
		 console.dir ('Found member');
			 models.meetupMember.remove({id: meetupMember.EventID}, function(err, _found) {
			 if (err) return console.error(err);
				meetupMember.save(function(err, meetupMember) {
				if (err) return console.error(err);
				   console.dir('Updated:[' + meetupMember.id+'] aka: '+meetupMember.name );
				});				
			 });
		 }
		if (_found.length == 0 ){
			meetupMember.save(function(err, meetupMember) {
			if (err) return console.error(err);
			 console.dir('New Member created:[' + meetupMember.EventID+'] '+meetupMember.name );
			 });	
		 }
	}).limit(1);
}
///-------------------------------------------------------
Meetup.prototype.GetUser=function(fields) {

	meetup.getMembers(fields,function(err,member) {
		if (err)
            meetupError(member);
			//console.dir(fields);
			console.dir('member.name :: '+member.results[0].name);
			if (typeof member != 'undefined'){
				if (MeetupChannel){
					new models.User.createMeetupUser(ConvertMemberToUser(member.results[0]));
					// console.dir('member.results est');
					var _member=member.results[0];
					console.dir(_member.name+'|'+ _member.lon+','+_member.lat+'|');
				}
			}
		});
}
function ConvertMemberToUser(meetupMember){
	var _meetupMember = new models.MeetupMember({
		  bio: meetupMember.bio,
		  birthday :meetupMember.birthday,
		  Country: meetupMember.Country, 
		  City: meetupMember.City,
		  State: meetupMember.State,
		  visited : meetupMember.email,
		  gender : meetupMember.gender,
		  hometown : meetupMember.hometown,
		  id : meetupMember.id,
		  lang: meetupMember.lang,
		  joined : meetupMember.joined,
		  settings : meetupMember.settings,
		  lat:meetupMember.lat, 
		  lon:meetupMember.lon,
		  name: meetupMember.name,
		  photo:meetupMember.photo,
		  visited :meetupMember.visited,
		  loc: [meetupMember.lon,meetupMember.lat]
	});

		return new models.User({
			name:meetupMember.name,
			bio:meetupMember.bio,
			email:meetupMember.email,
			sourceType:'meetup',
			sourceId:meetupMember.id,
			loc: [meetupMember.lon,meetupMember.lat]
		});

}
///-------------------------------------------------------
module.exports = {"Meetup" : Meetup};
///-------------------------------------------------------