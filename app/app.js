
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var meetup = require('meetup-api')('5f162b4a1e6c18144031593436255d38');
var _ = require('underscore');

// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('localhost:27017/data');

var mongoose = require('mongoose');
var restify = require('express-restify-mongoose')

mongoose.connect('localhost', 'data');

// mongoose.connect('localhost', 'data');
var lib = require('./routes/channels');
// var User = require('./routes/users');
// var Message = require('./routes/messages');

var channel = new lib.Channels();
var user = new lib.Users();
var message = new lib.Messages();


var app = express();

// all environments
app.set('port', process.env.PORT || 3500);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
//app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

// CHANNELS

app.get('/channels',  function(req, res, next) {
	channel.index (req,res);
});

app.post('/channels/echo',  function(req, res, next) {
 
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

app.post('/channels/find',  function(req, res, next) {
	channel.find (req,res);
});

app.post('/channels/findNear',  function(req, res, next) {
	channel.findNear (req,res);
});

app.post('/channels/create',  function(req, res, next) {
	channel.create (req,res);
});
app.post('/channels/delete',  function(req, res, next) {
	channel.delete (req,res);
});
app.post('/channels/post',  function(req, res, next) {
	channel.post (req,res);
});
app.post('/channels/subscribe',  function(req, res, next) {
	channel.subscribe (req,res);
});
app.post('/channels/unsubscribe',  function(req, res, next) {
	channel.unsubscribe (req,res);
});

app.post('/channels/broadcast',  function(req, res, next) {
	channel.broadcast (req,res);
});

// Users
app.post('/users/update',  function(req, res, next) {
	user.create (req,res);
});

app.post('/users/find',  function(req, res, next) {
	user.find (req,res);
});

app.get('/users',  function(req, res, next) {
	user.index (req,res);
});

app.post('/users/echo',  function(req, res, next) {
	res.send ( req.body );
});

app.post('/users/delete',  function(req, res, next) {
	user.delete (req,res);
});

// Messages

app.post('/messages/create',  function(req, res, next) {
	message.create (req,res);
});

app.post('/messages',  function(req, res, next) {
	message.index (req,res);
});


// UPLOAD PROCESSING

// app.post('/upload', function(req, res) {

	// fs.readFile(req.files.image.path, function (err, data) {

		// var imageName = req.files.image.name

		// /// If there's an error
		// if(!imageName){

			// console.log("There was an error")
			// res.send("ERROR");

		// } else {

		   // var newPath = __dirname + "/uploads/" + imageName;

		  // /// write file to uploads/fullsize folder
		  // fs.writeFile(newPath, data, function (err) {

			// console.log ("to dir - " + newPath);
			// console.log ("dir - " + err);

			// res.send({code : 200});

		  // });
		// }
	// });
// });

// /// Show files
// app.get('/upload/:file', function (req, res){

		// file = __dirname + "/uploads/" + encodeURIComponent(req.params.file);
	
		// var stat = fs.statSync(file);

	    // res.writeHead(200, {
	        // //'Content-Type': 'audio/mpeg',
	        // 'Content-Length': stat.size
	    // });

	    // var readStream = fs.createReadStream(file);
	    // // We replaced all the event handlers with a simple call to readStream.pipe()
	    // readStream.pipe(res);
	
	// // var img = fs.readFileSync(__dirname + "/uploads/" + file);
	// // //res.writeHead(200, {'Content-Type': 'image/jpg' });
	// // res.end(img, 'binary');

// });
channel.sync();
//console.log('Got this far biyatch');
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//channel.sync();
