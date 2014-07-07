// var express = require('express');
// var http = require('http');
// var path = require('path');
// var fs = require('fs');
//var meetup = require('meetup-api')('291b5a6c1e4f4c49345a587c8203312');
// var _ = require('underscore');
var Q = require('q');
// var async = require("async");

var mongoose = require('mongoose');
var models = require('./routes/valueObjects')(mongoose);

var vMeetup = require('./routes/vMeetup');
var vUser = require('./routes/vUser');
var vChannel = require('./routes/vChannel');

var MeetupService= new vMeetup.Meetup(models);
var UserService= new vUser.User(models);
var ChannelService= new vChannel.Channel(models);

var util = require('./routes/Util');
var Lib = new util.Util(models);

//====================================
var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('localhost', 'data');
//====================================
var seedMapPoints=[
{ 'lat' : '34.041034', 'lon' : '-118.361857','radius':'100','fields':'event_hosts'},
{ 'lat' : '34.031196', 'lon' : '-118.433480','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.984664', 'lon' : '-118.442148','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.915810', 'lon' : '-118.106169','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.918374', 'lon' : '-118.376020','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.838279', 'lon' : '-118.337225','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.791499', 'lon' : '-118.103765','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.714491', 'lon' : '-117.964625','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.684071', 'lon' : '-117.889438','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.679643', 'lon' : '-117.780433','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.543539', 'lon' : '-117.671414','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.519500', 'lon' : '-117.992077','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.656208', 'lon' : '-117.289639','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.549262', 'lon' : '-117.179776','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.420981', 'lon' : '-117.606182','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.210397', 'lon' : '-117.372036','radius':'100','fields':'event_hosts'},
{ 'lat' : '33.042485', 'lon' : '-117.296505','radius':'100','fields':'event_hosts'},
{ 'lat' : '32.766923', 'lon' : '-117.096005','radius':'100','fields':'event_hosts'},
{ 'lat' : '34.151205', 'lon' : '-118.224492','radius':'100','fields':'event_hosts'},
{ 'lat' : '34.169387', 'lon' : '-118.374180','radius':'100','fields':'event_hosts'},
{ 'lat' : '34.169387', 'lon' : '-118.625493','radius':'100','fields':'event_hosts'},
{ 'lat' : '34.208010', 'lon' : '-119.169316','radius':'100','fields':'event_hosts'},
{ 'lat' : '34.114830', 'lon' : '-117.270054','radius':'100','fields':'event_hosts'},
{ 'lat' : '35.344995', 'lon' : '-119.063572','radius':'100','fields':'event_hosts'}
];
 var  ManualChannels=[
 new models.Channel({ownerid:'a',partnerId:'native' , name: 'ManualTest1a',color:'black',loc:{"Longitude" : '-119.063572',"Latitude" : '35.344985'} }),
 new models.Channel({ownerid:'b',partnerId:'native' , name: 'ManualTest2',color:'blue',loc:{"Longitude" : '-119.063572',"Latitude" : '35.344985'} }),
 new models.Channel({ownerid:'b',partnerId:'native' , name: 'ManualTest3',color:'green',loc:{"Longitude" : '-119.063572',"Latitude" : '35.344985'} }),
 new models.Channel({ownerid:'a',partnerId:'native' , name: 'ManualTest4',color:'pink',loc:{"Longitude" : '-119.063572',"Latitude" : '35.344985'} })
 ];
 var  channelPosts =[
 new models.ChannelPost({ownerId:'a',channel:'53b5f5e611f2e530019d740d',comment:'This is that Post #1c',color:'black',pin:'true' }),
 new models.ChannelPost({ownerId:'a',channel:'53b5f5e611f2e530019d740d',comment:'This is that Post #2c',color:'red',pin:'true' }),
 new models.ChannelPost({ownerId:'a',channel:'53b5f5e611f2e530019d740d',comment:'This is that Post #3c',color:'blue',pin:'true' }),
 new models.ChannelPost({ownerId:'b',channel:'53b5f5e611f2e530019d740d',comment:'This is that Post #4c',color:'green',pin:'true' }),
  ];
 
var usersNotChannelOwners=[
new models.User({_id:'a', name:'RossBrodskiy',email:'rossbrod.weever@gmail.com',pushId:'fk2ye-2wd',sourceType:'native', loc:{"Longitude" : '-119.063572',"Latitude" : '35.344995'} }),
new models.User({_id:'b', name:'IlyaRidge',email:'ilyaridge.weever@gmail.com',pushId:'fk522ye-2wd',sourceType:'native', loc:{"Longitude" : '-119.067572',"Latitude" : '35.344595'} }),
new models.User({_id:'c', name:'Bystander',email:'bystander.weever@gmail.com',pushId:'fk522ye-2wd',sourceType:'native', loc:{"Longitude" : '-119.063571',"Latitude" : '35.343995'} }),
new models.User({_id:'d', name:'Inca',email:'inca.weever@gmail.com',pushId:'fk522ye-2wd',sourceType:'native', loc:{"Longitude" : '-119.063514',"Latitude" : '35.342991'} })
];

var Test = function () {}
//===========================================================================
Test.prototype.seedMeetups = function() {
	for (var i = 0; i < seedMapPoints.length; i++ ) {
		var events=MeetupService.getEventsByLocation(seedMapPoints[i]);
	}
return 1;
}
//===========================================================================
Test.prototype.seedMeetupMember= function() {
	models.MeetupChannel
	.distinct('Event_hosts').exec(function (err, _result) {
		Lib.syncLoop(_result.length, function(loop){
			setTimeout(function(){
				console.dir('Getting '+_result[loop.iteration()].member_id+' after a delay');
				MeetupService.GetUser({'member_id' : _result[loop.iteration()].member_id});
				loop.next();
			}, 750);
		}, function(){console.dir("done");
	});
});	
return 1;
}
//===========================================================================
Test.prototype.seedUsers= function() {
	models.MeetupMember.find().exec(function (err, _result) {
	for (var i = 0; i < _result.length; i++ ) {
		UserService.createUser( Lib.mapToUser(_result[i]).User );
		}
	});	
}
//===========================================================================
Test.prototype.seedChannel= function() {
	models.MeetupChannel.find().exec(function (err, _result) {
	Lib.syncLoop(_result.length, function(loop){
			var i=loop.iteration();
			if (typeof _result[i].Event_hosts[0] != 'undefined') {
			var _Channel=Lib.mapToChannel(_result[i]);
			 models.User.find({sourceId: _result[i].Event_hosts[0].member_id}).exec(function (err, _user) {
			 _Channel.ownerId=_user[0];
			 ChannelService.createChannel(_Channel);
			 loop.next();
			 });
			}
	}, function(){console.dir("DONE");});
	});
}
//===========================================================================
Test.prototype.seedNativeUsers =function() {
	for (var i = 0; i < usersNotChannelOwners.length; i++ ) {
		UserService.createUser(usersNotChannelOwners[i] );
		console.dir(usersNotChannelOwners[i]);
	}
}
//===========================================================================
Test.prototype.seedChannels=function() {
	for (var i = 0; i < ManualChannels.length; i++ ) {
	ManualChannels[i].save(function(err1, schmChannel) {
			if (err1) return console.error(err1);
			 console.dir('created:[' + schmChannel.id+']'+schmChannel.name);
			});	
	}
}
//===========================================================================
Test.prototype.seedChannelPosts=function() {
	for (var i = 0; i < channelPosts.length; i++ ) {
		ChannelService.channelPost(channelPosts[i] );
		console.dir(channelPosts[i]);
	}
}
//===========================================================================
Test.prototype.seedSubscriptions= function() {
models.User.findOne({_id:'a'}).exec(function(err, _result){
_result.subscriptions.push('53b5f5e611f2e530019d740d');
_result.subscriptions.push('53b5f6fee5dffc8c0a7ecbfa');
_result.subscriptions.push('53b5f6fee5dffc8c0a7ecbfd');
	_result.save(function(err1, _result1) {
				if (err1) return console.error(err1);
				 console.dir('created:[}' + _result1.subscriptions+'{]');
				});	
});
models.User.findOne({_id:'b'}).exec(function(err, _result){
_result.subscriptions.push('53b5f5e611f2e530019d740d');
_result.subscriptions.push('53b5f6fee5dffc8c0a7ecbfd');
	_result.save(function(err1, _result1) {
				if (err1) return console.error(err1);
				 console.dir('created:[}' + _result1.subscriptions+'{]');
				});	
});
models.User.findOne({_id:'c'}).exec(function(err, _result){
_result.subscriptions.push('53b5f6fee5dffc8c0a7ecbfa');
_result.subscriptions.push('53b5f6fee5dffc8c0a7ecbfd');
	_result.save(function(err1, _result1) {
				if (err1) return console.error(err1);
				 console.dir('created:[}' + _result1.subscriptions+'{]');
				});	
});
}
//===========================================================================
Test.prototype.someList= function(){

models.Channel.find({}, function (err, _found) {
for (var i = 0; i < _found.length; i++ ) {
	console.dir(_found[i].name);
	}
});

// models.ChannelPost.find({name:'ManualTest4'})
// .populate('ownerId')
	// .exec(function(err, _result)
	// { if (err) return console.error(err);
		// //console.dir(_result[0].ownerId);
		// console.dir(_result);
	// });
	
//models.Channel.findOne({name:'ManualTest2'}).populate('ownerId').exec(function(err, _result){console.dir(_result.ownerId.name);});

//models.User.findOne({_id:'c'}).populate('subscriptions').exec(function(err, _result){console.dir(_result.subscriptions);});
//models.ChannelPost.find({ownerId:'a'}).populate('channel').exec(function(err, _result){console.dir(_result);});
//models.ChannelPost.findOne({ownerId:'a'}).populate('channel').exec(function(err, _result){console.dir(_result);});
}

//===========================================================================
Test.prototype.cleanup= function(){
	models.User.find().remove().exec();
	models.Channel.find().remove().exec();
	models.ChannelPost.find().remove().exec();
}
Test.prototype.MainTest= function() {
//this.seedMeetups();
//this.seedMeetupMember();
//this.seedUsers();
//this.seedChannel(); //not used?!
//this.seedNativeUsers();
//this.seedChannels();
//this.seedChannelPosts();
//this.seedSubscriptions();
//this.someList();
//this.cleanup();
}

var test = new Test();
test.MainTest();

