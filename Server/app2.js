
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose')
var mandrill = require('mandrill-api/mandrill');
var async = require ('async');
var _ = require('underscore');
var apn = require('apn');
var Q = require('q');



var mandrill_key = "6oOUan0ntPgablpsZONDBw";

var mandrill_client = new mandrill.Mandrill(mandrill_key);

mongoose.connect('localhost', 'data');

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


var messageSchema = mongoose.Schema({
	fromUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
	toUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
	channel : { type: mongoose.Schema.Types.ObjectId , ref: 'channels' },
	message : String,
	timestamp : { type: Date, default: Date.now }
});

var Message = mongoose.model('messages' , messageSchema);


var userSchema = mongoose.Schema({
  name: String,
  deviceId : String,
  pushId : String,
  avatar : String,
  autojoin : Boolean,
  email : String,
  subscriptions : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channels' }],
  timestamp : { type: Date, default: Date.now },
  loc: []
});

var User = mongoose.model('users' , userSchema);


function ChannelPosts() {
}

var channelPostSchema = mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
  channel: { type: mongoose.Schema.Types.ObjectId , ref: 'channels' },
  content : {},
  color : String,
  type : Number,
  pin : String,
  image : String,
  sound : String,
  timestamp : { type: Date, default: Date.now }
});

var ChannelPost = mongoose.model('channelPosts' , channelPostSchema);

var channelSchema = mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId , ref: 'users' }, // owner id for now
  name: String,
  content : String,
  color : String,
  image : String,
  sound : String,
  pin : String,
  loc: [],
  type: Number,
  radius: Number,
  subscribers: [{ type: mongoose.Schema.Types.ObjectId , ref: 'users' }],
  posts : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channelPosts' }],
  timestamp : { type: Date, default: Date.now },
  ttl : Date
});

channelSchema.index({ loc: '2d' });

var Channel = mongoose.model('channels', channelSchema);

// all environments
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

var app = express();


app.configure(function(){
	
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	
	app.set('port', process.env.PORT || 3500);
	    app.use(express.bodyParser());
	    app.use(express.methodOverride());
	app.use(express.logger('dev'));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
    restify.serve(app, Message);
    restify.serve(app, User);
    restify.serve(app, ChannelPost);
    restify.serve(app, Channel);
	
});

// development only
app.post('/weapi/Channels',  function(req, res, next) {
 
 	var b = {body : req.body , headers : req.headers };


	res.send (b);
  	
});


app.post('/weapi/echo',  function(req, res, next) {
 
 	var b = req.body;

	console.log (b);
	console.log (req.files);
	
	res.send ( b );

   return;	
   
  req.form.complete(function(err, fields, files){
    if (err) {
      next(err);
    } else {
      console.log('\nuploaded %s to %s'
        ,  files.image.filename
        , files.image.path);
      
	if (files)
		b.fileCount = files.count;
		
	res.send ( b );
      
    }
  });

  // We can add listeners for several form
  // events such as "progress"
  req.form.on('progress', function(bytesReceived, bytesExpected){
    var percent = (bytesReceived / bytesExpected * 100) | 0;
    console.log ('Uploading: %' + percent + '\r');
  });
  	
});

app.post('/weapi/findNear',  function(req, res, next) {
	
      var d = req.body;
	  
	  console.log (JSON.stringify(d));

  	  Channel.find({ loc : { '$near' : [ parseFloat(d.loc[0]), parseFloat(d.loc[1]) ] , '$maxDistance' : 1/444.48 }})
  	  .where ('type').in ([0,1])
  	  .populate ('subscribers')
  	  .populate ('messages')
  	  .exec (function (err, result) {
  		  //if (err) return handleError(err);
  		  // get all channels user is subscribed to
  		  var retVal = result;
		  
  		  Channel.find ({ 'subscribers.id' : { $in: [d.id] }})
  		  .populate ('subscribers')
  		  .populate ('messages')
  		  .exec(function (err, result) {  

      	  	retVal = retVal.concat (result).unique();
 	  		  	
         		 res.send (retVal);
				  
  		  });
  	  });
  
	
});

app.post('/weapi/postChannelMessage',  function(req, res, next) {
	
    new ChannelPost(d).save(function(err , result) {

		//console.log('message saved #' + ':\t' + result);
		
		var messageid = result._id; // newly created message
		  
		Channel.findOne({ _id : d.channel })
//		  .populate ('subscribers')
//		  .populate ('messages')
		  .exec (function (err, result) {
		  
		  	  var c = result; // the full channel data into which message went
			  
			  //console.log (c);
		  	  
			  if (c.messages)
				  c.messages.push (messageid);
			  else
				  c.messages =  [messageid];
		  	  
			  c.save ( function (err, result) {
					if(err) throw err;
					
					Channel.findOne({ _id : result._id })
					  .populate ('subscribers')
					  .populate ('messages')
					  .exec (function (err, result) {
						  	res.send(result);
						});
					// console.log('channel saved #' + ':\t' + c.name);
				});
		  	  
		  	  if (parseInt(c.type)==2) { // needs work to covert to actual user ids
					  var subscribers = _.without (c.subscribers , messageid);
		  
					  _.each(subscribers , function (userId) {
				  
						  console.log('each user #' + ':\t' + userId);
						  User.findOne({ device : userId}, function (err, user) {
									console.log(user);
						   
									if (user) {
							
										var options = { "gateway": "gateway.sandbox.push.apple.com",
														passphrase: "Poiu0987"
													};

										var apnConnection = new apn.Connection(options);

				//						var token= "bf0f9bab4fbfaa825a6de9dc734a3397b5ef46f7ccab5dd2d62abba703b4ebba";
										var token= user.pushId.replace(" " , "").replace("<", "").replace(">","");
										console.log('pushing to token #' + ':\t' + token);

										var myDevice = new apn.Device(token);

										var note = new apn.Notification();

										note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
										note.badge = 1;
										// note.content-available : 1 // need it in order to handle background mode updates
										note.sound = "ping.aiff";
										note.alert = d.content;//"\uD83D\uDCE7 \u2709 You have a new message";
										note.payload = {'messageFrom': 'Caroline'};

										apnConnection.pushNotification(note, myDevice);
							
									}
						  
					  
								  // var msg = { "to" : {email : user.email , name : user.name , subject : "Notification" } , name : user.name , status : d.message.body , email : user.email };
					  
								  // sendMail (tpl(msg));
					  
							});
			
					  });
			  }
			  
			  /*
			  CustphoneSchema.findOne({}).populate('subdomain').run(function(err, custPhone) { 
			  // Your callback code where you can access subdomain directly through custPhone.subdomain.name 
			  })	*/		  
		  
			  // for each subscriber find the subscriber preferences and send the message / notification to them
		  
		});

    })
	
	
});

app.post('/weapi/subscribeUser',  function(req, res, next) {
	
	
	
	var saveChannel = function (userId , channelId) {
		
		var deferred = Q.defer();
			
		
			Channel.findOne( { _id : channelId }, function (err, result) {
				  //if (err) return handleError(err);
				  var c = result;
		  
				  c.subscribers = _.without ( c.subscribers , userId);
		  
				  c.subscribers.push (userId);
		  
				  c.save ( function(err) {
						if(err) throw err;
						deferred.resolve(c);
					});
		  
			});
			
			return deferred.promise;
		
	}
	
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

	User.findOne ( {device : d.id } , function (err, result) {
		var u = result;
		if (u) {
					if (d.channel) {
						u.subscriptions = _.without ( u.subscriptions , d.channel);
						u.subscriptions.push (d.channel);
						u.pushId = d.pushId;
		
						u.save ( function(err) {
								if(err) throw err;
								console.log('user saved #' + ':\t' + u.pushId);
							});
				}
		}
		else {
				var n = {
					name : d.id,
					device : d.id,
					pushId : d.pushId,
					subscriptions : [d.channel]
				}
				
			    new User(n).save(function(err , result) {
			    	console.log('new user #' + ':\t' + n.name);
			    });

		}
		
		
		
	});
  
  	
  	if (d.pin) {
  			Channel.findOne( { pin : d.pin }, function (err, result) {
			  //if (err) return handleError(err);
			  
			  if (!result || result.length == 0) {
			  	
			  	res.send(result);
			  	return;

			  }
			  else {
			  
				  var c = result;
		  
				  c.subscribers = _.without ( c.subscribers , d.id);
		  
				  c.subscribers.push (d.id);
		  
				  c.save ( function(err) {
						if(err) throw err;
						console.log('saved #' + ':\t' + c.name);
						res.send(c);
					});
				
			}
		  
		});
  	}
 
 	
});
	
app.post('/weapi/unsubscribeUser',  function(req, res, next) {
	
	
    var d = req.body;
  
	User.findOne ( {device : d.id } , function (err, result) {
		var u = result;
		if (u) {
					if (d.channel) {
						u.subscriptions = _.without ( u.subscriptions , d.channel);
		
						u.save ( function(err) {
								if(err) throw err;
								console.log('unsubscribe user saved #' + ':\t' + u.pushId);
							});
				}
		}
		
	  	if (d.channel) {
			Channel.findOne( { _id : d.channel }, function (err, result) {
				  //if (err) return handleError(err);
				  var c = result;
		  
				  c.subscribers = _.without ( c.subscribers , result._id);
		  
				  c.save ( function(err) {
						if(err) throw err;
						console.log('unsubscribe channel saved #' + ':\t' + c.name);
						res.send(c);
					});
			});
	  	}
		
	});
	
	
});

// Users

app.post('/upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.send("ERROR");

		} else {

		   var newPath = __dirname + "/uploads/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

			console.log ("to dir - " + newPath);
			console.log ("dir - " + err);

			res.send({code : 200});

		  });
		}
	});
});

/// Show files
app.get('/upload/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
