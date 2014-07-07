var mongoose = require('mongoose');
var Q = require('q');
var mandrill = require('mandrill-api/mandrill');
var async = require ('async');
var _ = require('underscore');
var mandrill_key = "6oOUan0ntPgablpsZONDBw";
var mandrill_client = new mandrill.Mandrill(mandrill_key);
var apn = require('apn');
var meetup = require('meetup-api')('5f162b4a1e6c18144031593436255d38');
var fs = require("fs");
var request = require('request')

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i]._id.toString() == a[j]._id.toString())
            {
            	//console.log ("a - " + a[i]._id);
            	//console.log ("b - " + a[j]._id);
            	
                a.splice(j--, 1);
            }
        }
    }

    return a;
};


function Channels() {
}

function PushNotifications () {

var options = { "gateway": "gateway.sandbox.push.apple.com" };

var apnConnection = new apn.Connection(options);

var token= "bf0f9bab4fbfaa825a6de9dc734a3397b5ef46f7ccab5dd2d62abba703b4ebba";

var myDevice = new apn.Device(token);

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
note.payload = {'messageFrom': 'Caroline'};

apnConnection.pushNotification(note, myDevice);


// FEEDBACK SERVICE

var options = {
    "batchFeedback": true,
    "interval": 300
};

var feedback = new apn.Feedback(options);
feedback.on("feedback", function(devices) {
    devices.forEach(function(item) {
        // Do something with item.device and item.time;
    });
});

}


function Users() {
	//mongoose.connect('localhost', 'data');
	//mongoose = db;
}

function Messages() {
}

var messageSchema = mongoose.Schema({
	fromUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
	toUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
	//channel : { type: mongoose.Schema.Types.ObjectId , ref: 'channels' },
	message : String,
	timestamp : { type: Date, default: Date.now }
	
});

var Message = mongoose.model('messages' , messageSchema);


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

userSchema.index({ loc: '2d' });


var User = mongoose.model('users' , userSchema);


function ChannelPosts() {
}

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

var channelSchema = mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId , ref: 'users' }, // owner id for now
  partnerId : String, // Who the Data Source partner is (eg. MeetUp)
  partnerItemId : String, // the Item ID from the partner data set
  name : String,
  content : String,
  color : String,
  image : String,
  sound : String,
  pin : String,
  loc : [],
  type : { type : Number, default : 0 } ,
  radius : {type : Number , default : 100 },
  subscribers : [{ type: mongoose.Schema.Types.ObjectId , ref: 'users' }],
  posts : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channelPosts' }],
  timestamp : { type: Date, default: Date.now },
  ttl : {type : Date , default : Date.now }
});

channelSchema.index({ loc: '2d' });

var Channel = mongoose.model('channels', channelSchema);


Messages.prototype.index = function(req, res){

  var d = req.body;
  //query.or(array);
  
  Message.find ()
  .where ( { $or: [
            { $and : [{ fromUser : d.fromUser } , { toUser : d.toUser }] },
            { $and : [{ fromUser : d.toUser } , { toUser : d.fromUser }] }
        ] }
		)
  .sort([['timestamp', 'ascending']])
  .exec(function (err, result) {
	    console.log ("messages count: " + result.length );
		res.send(result);
  });
	  
};

Messages.prototype.create = function(req, res){
	
	var d = req.body;

  	 new Message(d).save (function(err , result) {
			console.log (JSON.stringify(err))
  			console.log (JSON.stringify(result));
  			res.send(result);
  		});
	
};


/* MESSAGE FUNCTIONS */

/* USER FUNCTIONS */

Users.prototype.index = function(req, res){
  res.send("here is a list of users");
};

Users.prototype.create = function(req, res){
	
	var d = req.body;
	
	console.log (JSON.stringify(d))
	
	if (d._id && d._id.length > 0) {

		User.findOne ({_id : d._id },  function (err, result) {

			var user = result;
			
			user.firstName = d.firstName;
			user.lastName = d.lastName;
			user.title = d.title;
			user.bio = d.bio;
			user.device = d.device;
			user.pushId = d.pushId;
			user.email = d.email;
			user.avatar = d.avatar;
			user.cover = d.cover;
			user.settings = d.settings;
			
			user.save ();
			
			res.send (user);
			
			
		});
	} else	{

     	delete d._id;

      	 new User(d).save (function(err , result) {
      		 //console.log (JSON.stringify(err))
      			console.log (JSON.stringify(result));
      			res.send(result);
      		});
		
	}
	
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

// console.log (JSON.stringify(d))

	var criteria = {};
	
	if (d._id && d._id.length > 0)
		criteria = {_id : d._id };
	else
		if (d.device && d.device.length > 0)
			criteria = { device : d.device };
		else {
			res.send ({});
			return;
		}
	

	User.findOne ( criteria ,  function (err, result) {

		var user = result;
		
		res.send (user);
		
	});
  
};

Users.prototype.index = function(req, res){
  res.send("here is a list of Users");
};

Users.prototype.checkIn = function(req, res){
  res.send("here is a list of Users");
  // when a user checks in based on the location the subscriptionswill be cleaned up / subscribed
};

/*  CHANNEL FUNCTIONS */

Channels.prototype.sync = function() {
	
	/*
	
	var channelSchema = mongoose.Schema({
	  ownerId: { type: mongoose.Schema.Types.ObjectId , ref: 'users' }, // owner id for now
	  partnerId : String, // Who the Data Source partner is (eg. MeetUp)
	  partnerItemId : String, // the Item ID from the partner data set
	  name : String,
	  content : String,
	  color : String,
	  image : String,
	  sound : String,
	  pin : String,
	  loc : [],
	  type : { type : Number, default : 0 } ,
	  radius : {type : Number , default : 100 },
	  subscribers : [{ type: mongoose.Schema.Types.ObjectId , ref: 'users' }],
	  posts : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channelPosts' }],
	  timestamp : { type: Date, default: Date.now },
	  ttl : {type : Date , default : Date.now }
	});
	
	
	*/
	
	meetup.getOpenEvents({ 'lon' : '-118.420615799005' ,  'lat' : '34.04430982618545', 'radius' : '100' , 'limited_events' : true  }, function(err,events) {
		//_.each (events.results, function (ev) {
			for (var i = 0; i < events.results.length; i++ ) {
				
			var ev = events.results[i];
				
			if (ev.distance < 20) {

				var o = {
					partnerId : '1',
					partnerItemId : ev.id,
					name : ev.name,
					content : ev.description,
					loc : ev.venue ? [ev.venue.lon , ev.venue.lat   ] : ev.group ? [ev.group.group_lon , ev.group.group_lat ] : [] ,
				};
				console.log (ev.name)
/*
				(function(e) {
							var condition = { partnerItemId : e.partnerItemId.toString()};
							console.log ("ID Before " + condition);
							Channel.find()
							.where('partnerItemId').in([e.partnerItemId.toString()])
							.exec().then (function (val , result) {
								
								// console.log ("error");
								console.log (result);
								console.log (val);
								
								  if (!result || result.length == 0 ) {
									  //console.log ("created : " + result._id + 'partnerId In ' + e.partnerItemId + ' ' + result.partnerItemId);
									  //console.log ("NOT Found " + e.partnerItemId);
									  // new Channel(e).save (function (err,result) {
									  // 										  console.log ("New created : " + result._id + 'partnerId In ' + e.partnerItemId + ' ' + result.partnerItemId);
									  // });
								  }
								  else {
									  
									  console.log ("FOUND");
						  
  									  var n = result[0];
  						  
  									  n.partnerID = e.PartnerID;
  									  n.partnerItemId = e.parnerItemId;
  									  n.name = e.name;
  									  n.content = e.content;
  									  n.loc = e.loc;
  						  
  									  n.save (function (err,result) {
  									  						 console.log ("updated : " + n._id);
  									  					  });
							  }
	  
							});
				     })(o);
*/
					 //////////
			}
		};//);
	});
	
}

Channels.prototype.index = function(req, res){
	/*
var options = {
    cert: __dirname + '/PushDevCertKey.pem',                       
    certData: null,                                
    key:  __dirname + '/PushDevCertKey.pem',                       
    keyData: null,                                 
    passphrase: 'admin',                              
    ca: null,                                      
    pfx: null,                                     
    pfxData: null,                                 
    gateway: 'gateway.sandbox.push.apple.com',     
    port: 2195,                                    
    rejectUnauthorized: true,                      
    enhanced: true,                                
    errorCallback: apnErrorCallback,                      
    cacheLength: 100,                              
    autoAdjustCache: true,                         
    connectionTimeout: 0
}	
	*/
		var options = { "gateway": "gateway.sandbox.push.apple.com",
		 				passphrase: "Poiu0987"
					};

		var apnConnection = new apn.Connection(options);

		var token= "bf0f9bab4fbfaa825a6de9dc734a3397b5ef46f7ccab5dd2d62abba703b4ebba";

		var myDevice = new apn.Device(token);

		var note = new apn.Notification();

		note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
		note.badge = 1;
		note.sound = "ping.aiff";
		note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
		note.payload = {'messageFrom': 'Caroline'};

		apnConnection.pushNotification(note, myDevice);

		  res.send("here is a list of channels");
};

Channels.prototype.create = function(req, res){
	
	var d = req.body;
	
	d.loc = [ parseFloat(d.loc[0]), parseFloat(d.loc[1]) ];
		
	User.findOne ( { _id : d.ownerId } , function (err, result) {

		var u = result;
		
		if (u) { // user already exists
			
					d.subscribers = [u._id];
			
				    new Channel(d).save(function(err , result) {

					  console.log(result);
					  
				  	  if (u.subscriptions)
						  u.subscriptions.push (result._id);
					  else
						  u.subscription = [result._id];
						  
					  u.save();
					  
					  Channel.find ({ _id : result._id })
					  .populate ('subscribers')
					  .populate ('messages')
					  .exec(function (err, result) {  
 	  		  	
			       		 res.send (result);
				  
					  });					  

				 })
			 }
		 });
	
};

Channels.prototype.delete = function(req, res){
	
	var d = req.body;
	
	Channel.findOneAndRemove ( {_id : d._id } , function (err, result) {

		  if (err) 
		  	throw err;
		  
		  console.log(result);

		  res.send(result);
		  
	});
};

Channels.prototype.find = function(req, res){
  //res.send("finding a channels");
  
  var d = req.body;
  
  Channel.findOne({ _id : d._id }, function (err, result) {

		  //if (err) return handleError(err);

  		  var channel = result;
		  var subscribers = channel.subscribers;
		  var messages = channel.messages;
		  
		    Message.find({	'_id': { $in: messages } }, function (err, result) {
		    
        		  //if (err) return handleError(err);

					
       			 channel.messages = result;
       			 
     			  res.send(channel);

					/* 
					User.find({	'_id': { $in: subscribers } }, function (err, result) {
					
							 // if (err) return handleError(err);
				
							 channel.subscribers = result;
							 
							  console.log(channel);
							   // Space Ghost is a talk show host.
							  res.send(channel);
	  
						}); */
					 
		  
				});
		  
	});
  
};

var saveChannel = function (userId , channelId , subscribe) {
	
	var deferred = Q.defer();
		
	
		Channel.findOne( { _id : channelId }, function (err, result) {
			  //if (err) return handleError(err);
			  var c = result;
	  
			  
			  var newArr = [];
			  for (var i = 0 ; i < c.subscribers.length ; i ++)  {
				  if (c.subscribers[i].toString() != userId)
					  newArr.push (c.subscribers[i]);
			  }
			  
			  c.subscribers = newArr;
	  
	  		  if (subscribe)
				  c.subscribers.push (userId);
				  
	  
			  c.save ( function(err) {
					if(err) throw err;
					deferred.resolve(c);
				});
	  
		});
		
	return deferred.promise;
	
}

var saveUser = function (userId , channelId , subscribe) {
	
	var deferred = Q.defer();

	User.findOne ( {_id : userId } , function (err, result) {
	
			  var u = result;
			
			  var newArr = [];
			  for (var i = 0 ; i < u.subscriptions.length ; i ++)  {
				  if (u.subscriptions.toString() != channelId)
					  newArr.push (u.subscriptions[i]);
			  }
		  
			  u.subscriptions = newArr;
			
	  		  if (subscribe)
				  u.subscriptions.push (channelId);

			  u.save ( function(err) {
						if(err) throw err;
					
						deferred.resolve(u);
					
						console.log('user saved #' + ':\t' + u.pushId);
					});
	
	});
		
	return deferred.promise;
	
}

Channels.prototype.subscribe = function(req, res) {
	// subscribe user to a channel
	
	var getChannel = function (userId , channelId) {
		
			var deferred = Q.defer();
		
			Channel.findOne( { _id : channelId }, function (err, result) {
				  //if (err) return handleError(err);
				  var c = result;
		  
    				deferred.resolve(c);
		  
			});
			
			return deferred.promise;
		
	}
	
    var d = req.body;
	
  	if (d.pin) {
  			Channel.findOne( { pin : d.pin }, function (err, result) {
	
			  var c = result;
			  
			  if (!result || result.length == 0) {
			  	
			  	res.send(result);
			  	return;

			  }
			  
			  saveUser (d._id , c._id , true).then (function (user) {
				  if (user)
				  		saveChannel (d._id , c._id , true ).then (function (channel) {
							res.send (channel);
				  		});
			  });
		  
		});
  	} else {
  		
			  saveUser (d._id , d.channel , true).then (function (user) {
				  if (user)
				  		saveChannel (d._id , d.channel , true).then (function (channel) {
							res.send (channel);
				  		});
			  });
		
  	}
  
};

Channels.prototype.unsubscribe = function(req, res){
	
  var d = req.body;
	
  saveUser (d._id , d.channel , false).then (function (user) {
	  if (user)
	  		saveChannel (d._id , d.channel , false).then (function (channel) {
				res.send (channel);
	  		});
  });
	
};

Channels.prototype.findNear = function(req, res){

  var d = req.body;
  
//  console.log("data: " + d);

		User.findOne ( {_id : d._id } , function (err, result) {

				  var u = result;
				  
				  u.loc = [ parseFloat(d.loc[0]), parseFloat(d.loc[1]) ];
				  
				  u.save ( function(err) {
					  
							if(err) console.log(err);
							console.log('user saved #' + ':\t' + u._id);
						});
		});

	  
	  Channel.find({ loc : { '$near' : [ parseFloat(d.loc[0]), parseFloat(d.loc[1]) ] , '$maxDistance' : 1/444.48 }})
	  .where ('type').in ([0,1])
	  .populate ('subscribers')
	  .populate ('posts')
	  .sort([['timestamp', 'descending']])
	  .exec (function (err, result) {
		  //if (err) return handleError(err);
		  var near = result;
		  
		  var id = mongoose.Types.ObjectId(d._id);
		  
		  console.log (d);
		  
		  Channel.find ({'subscribers' : id}) // { id : { $in: 'subscribers' }}
		  //.where()
		  .populate ('subscribers')
		  .populate ('posts')
		  .exec(function (err, result) {  
			  
  			  var subscribed = result;

			   User.find({ loc : { '$near' : [ parseFloat(d.loc[0]), parseFloat(d.loc[1]) ] , '$maxDistance' : 1/444.48 }})
			  .sort([['timestamp', 'descending']])
			  .exec (function (err, users) {
				  
	    			console.log (err);
		  			console.log ('count - ' + users.length);
			
		      	  	//retVal = retVal.concat (result).unique();
		  	  	  	var retVal = {'unique' : [], 'users' : users, 'near' : near , 'subscribed' : subscribed };
 	  		  	
	         		 res.send (retVal);
				  
			  
			  });

				  
		  });
	  });
  
};

Channels.prototype.findMessages = function(req, res){

  var d = req.body;
  
//  console.log("data: " + d);
  
	  Channel.find({ loc : { '$near' : [ parseFloat(d.loc[0]), parseFloat(d.loc[1]) ] } }, function (err, result) {
		  //if (err) return handleError(err);
		  console.log(d);
		   // Space Ghost is a talk show host.
		  res.send(result);
	});
  
};

Channels.prototype.post = function(req, res){
	// when a message is posted to the channel need to send the message to subscribers
    var d = req.body;
  
  	// store message
	
	if (d.fileUrl.length > 1) {
		var filename = d.fileUrl.split('/').pop();
		var url = d.fileUrl;
		d.fileUrl = filename;
		request(url).pipe(fs.createWriteStream("uploads/" + filename));
	}
	
    new channelPost (d).save(function(err , result) {

		console.log('d saved #' + ':\t' + d);
		console.log('result saved #' + ':\t' + result);
		
		
		var postId = result._id; // newly created message
		  
		Channel.findOne({ _id : d.channel })
//		  .populate ('subscribers')
//		  .populate ('messages')
		  .exec (function (err, result) {
		  
		  	  var c = result; // the full channel data into which message went
			  
			  //console.log (c);
		  	  
			  if (c.posts)
				  c.posts.push (postId);
			  else
				  c.posts =  [postId];
		  	  
			  c.save ( function (err, result) {
					if(err) throw err;
					
					Channel.findOne({ _id : result._id })
					  .populate ('subscribers')
					  .populate ('posts')
					  .exec (function (err, result) {
						  	//console.log (result);
						  	res.send(result);
						});
					// console.log('channel saved #' + ':\t' + c.name);
				});
		  	  
				console.log ("channel type " + c.type);
			  
		  	  if (parseInt(d.type)==2) { // needs work to covert to actual user ids
				  
				  
					  var newArr = [];
					  for (var i = 0 ; i < c.subscribers.length ; i ++)  {
						  if (c.subscribers[i].toString() != d.ownerId)
							  newArr.push (c.subscribers[i]);
					  }
					  
					  console.log ("users Array " + newArr);
					  
					  User.find ( { _id :  { '$in' : newArr  } }, function (err, users) {
						  
						  console.log ("this many users " + users.length);
						  
								if (users) {
									
									for (var i = 0 ; i < users.length ; i++ ) {
										
										if (users[i].pushId && users[i].pushId.length > 0 ) {
											var options = { "gateway": "gateway.sandbox.push.apple.com",
															passphrase: "Poiu0987"
														};

											var apnConnection = new apn.Connection(options);

					//						var token= "bf0f9bab4fbfaa825a6de9dc734a3397b5ef46f7ccab5dd2d62abba703b4ebba";
											var token= users[i].pushId.replace(" " , "").replace("<", "").replace(">","");

											console.log('pushing to token #' + ':\t' + token);

											var myDevice = new apn.Device(token);

											var note = new apn.Notification();

											note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
											note.badge = 1;
											// note.content-available : 1 // need it in order to handle background mode updates
											note.sound = "ping.aiff";
											note.alert =  d.content;//"\uD83D\uDCE7 \u2709 You have a new message";
											note.payload = {'messageFrom': users[i].firstName };

											apnConnection.pushNotification(note, myDevice);
									}
									
								  }
						
								}
					  
				  
							  // var msg = { "to" : {email : user.email , name : user.name , subject : "Notification" } , name : user.name , status : d.message.body , email : user.email };
				  
							  // sendMail (tpl(msg));
				  
						});
			
					  
			  }
			  
			  /*
			  CustphoneSchema.findOne({}).populate('subdomain').run(function(err, custPhone) { 
			  // Your callback code where you can access subdomain directly through custPhone.subdomain.name 
			  })	*/		  
		  
			  // for each subscriber find the subscriber preferences and send the message / notification to them
		  
		});

    })
	
  
  	// broadcast it to subscribers of the channel
	
};

Channels.prototype.broadcast = function(req, res){
  res.send("Broadcast to a channel");
};

/* VARIOUS FUNCTIONS */
var tpl = function (u) {
	
    var vars = [
        {
            "name": "NAME",
            "content": u.name
        },
		
        {
            "name": "STATUS",
            "content": u.status
        },
        {
            "name": "DATE",
            "content": "Today"
        },
		
        {
            "name": "EMAIL",
            "content": u.email
        }
    ];
	
	var params = {
		template : "account-status",
		// to : [{ 
		// 		email : u.email, 
		// 		name : u.name , 
		// 		subject : "Your BonteBox Subscription update" },
		// 	{ 
		// 		email : "copy@bontebox.com", 
		// 		name : "Bonte Acct" , 
		// 		subject : "Subscription update " + u.email }],
		
		to : { 
				email : u.email, 
				name : u.name , 
				subject : "Your BonteBox Subscription update" },
		
		vars : vars,
		tags : ["account"],
		async : true,
		send_at : null//moment().add('weeks', 1).startOf('week').add("days" , 3).startOf('day').add("hours" , 10).utc()
	}
	
	return params;
	
}

var sendMail = function (params) {
	
	var m = params;
	
	var today = new Date();
	
	//console.log ("From Mandrill - " + JSON.stringify(m));
		
	var message = {
				        "subject": m.to.subject,
				        "from_email": "info@bontebox.com",
				        "from_name": "BonteBox",
				        "to": [
				            {
				                "email": m.to.email,
				                "name": m.to.name,
				                "type": "to"
				            }
				        ],
				        "headers": {
				            "Reply-To": "info@bontebox.com"
				        },
				        "important": false,
				        "track_opens": true,
				        "track_clicks": true,
				        "auto_text": null,
				        "auto_html": null,
				        "inline_css": null,
				        "url_strip_qs": null,
				        "preserve_recipients": null,
				        "view_content_link": null,
				        //"bcc_address": "message.bcc_address@example.com",
				        "tracking_domain": null,
				        "signing_domain": null,
				        "return_path_domain": null,
				        "merge": true,
				        "global_merge_vars": [],          
				        "merge_vars": [
				            {
				                "rcpt": m.to.email,
				                "vars": m.vars
				            }
				        ],
				        "tags": m.tags
					};
					
	
	mandrill_client.messages.sendTemplate({ "template_name": m.template, 
											"template_content": [], 
											"message": message, 
											"async": m.async ? m.async : null, 
											"ip_pool": "Main Pool", 
											"send_at": m.send_at ? m.send_at : null
										}, 
											
											function(result) {
												
														// m.mandrill_id = result._id;
														
														console.log (result);
														
													}, function(e) {
														
													    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
													    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
													}
												);	

	
	
}


module.exports = {"Channels" : Channels , "Users" : Users, "Messages" : Messages};



