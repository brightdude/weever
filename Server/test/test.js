// var Q = require("q");
// var fs = require("fs");
// var sys = require('util');
var request = require('request')
var rest = require('restler');
var _ = require('underscore');
var moment = require('moment');
var meetup = require('meetup-api')('5f162b4a1e6c18144031593436255d38');


function pm_process (m , action) {
	var KKK="sss";
	KKK="hellYea"; 
	KK="gg";
	var deferred = Q.defer();
	
	/*
	
curl https://api.postmaster.io/v1/validate \
   -u tt_MTkzMTAwMTpTMGVJOGNONFNZVXRIbGRYdVM0ZF9HUUJEdEk: \
   -d "company=ACME" \
   -d "contact=Joe Smith" \
   -d "line1=100 Congress Ave." \
   -d "city=Austin" \
   -d "state=TX" \
   -d "zip_code=78701"	
	
	*/
	
	// shipments
	// var action = "validate";
	
	var params =  { };
	
	switch (action) {
		
		case "validate" :
			
			params = 	  { 
							  "company"  : m.company,
							  "contact"  : m.firstname + " " + m.lastname,
							  "line1"	 : m.address,
							  "line2"    : m.address2,
							  "city"	 : m.city,
							  "state" 	 : m.state,
							  "zip_code" : m.zipcode 
						  };
			
			break;
			
		case "shipments" :
			/*
				-d "to[company]=ASLS" \
				   -d "to[contact]=Joe Smith" \
				   -d "to[line1]=1110 Someplace Ave." \
				   -d "to[city]=Austin" \
				   -d "to[state]=TX" \
				   -d "to[zip_code]=78704" \
				   -d "to[phone_no]=5551234444" \
				   -d "carrier=ups" \
				   -d "service=2day" \
				   -d "package[weight]=1.5" \
				   -d "package[length]=10" \
				   -d "package[width]=6" \
				   -d "package[height]=8"			
			*/
			
			params = 	  { 
							  "from[company]": "BonteBox.com",
							  "from[line1]"  : "9107 Wilshire Blvd.",
							  "from[city]"	 : "Beverly Hills",
							  "from[state]"  : "CA",
							  "from[zip_code]" : "90210",
							  "from[phone_no]" : "3235404542",
							  "to[company]"  : m.company,
							  "to[contact]"  : m.firstname + " " + m.lastname,
							  "to[line1]"	 : m.address,
							  "to[line2]"    : m.address2,
							  "to[city]"	 : m.city,
							  "to[state]" 	 : m.state,
							  "to[zip_code]" : m.zipcode,
							  "to[phone_no]" : m.userPhone,
							  "package[type]" : "CUSTOM",
							  //"package[type]" : "CARRIER_BOX_SMALL",

							  "package[weight_units]" : "OZ",
           					  "package[weight]" : "11",
							  "package[dimension_units]" : "IN",
							  "package[width]" : "8.6875",
							  "package[length]" : "5.4375",
							  "package[height]" : "1.75",
							  
							  //"service" : "2DAY",
							  "service" : "1ST_CLASS",
							  "carrier" : "USPS"
						  };
			
			
			break;
			
		default: 
			break; 
		
	}
	
	// _log ("params",params);
	// return;
	
	var authorize = "Basic " + new Buffer(pm_key + ":").toString('base64');
	
	console.log("postage before rest");
	
	
	rest.post('https://api.postmaster.io/v1/' + action , {
	
	  headers : { "Authorization" : authorize  },
	  async : false,
	  data : params
	  
	  
	}).on('complete', function(data, response) {
		
		console.log("validation rest complete " + JSON.stringify(data));
	  
		deferred.resolve (data);
	  
	});
	
	return deferred.promise;	
	
}
function mandrill_send (m) {
	
	var deferred = Q.defer();
	

	var mandrill_client = new mandrill.Mandrill(mandrill_key);	
	
	// //mandrill_client.messages.cancelSchedule({"id" : "4bb4465922834e80848de01b9f4a2728"});
	// 
	// var id = "4bb4465922834e80848de01b9f4a2728";
	// mandrill_client.messages.cancelScheduled({"id": id}, function(result) {
	//     console.log(result);
	//     /*
	//     {
	//         "_id": "I_dtFt2ZNPW5QD9-FaDU1A",
	//         "created_at": "2013-01-20 12:13:01",
	//         "send_at": "2021-01-05 12:42:01",
	//         "from_email": "sender@example.com",
	//         "to": "test.recipient@example.com",
	//         "subject": "This is a scheduled email"
	//     }
	//     */
	// }, function(e) {
	//     // Mandrill returns the error as an object with name and message keys
	//     console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	//     // A mandrill error occurred: Invalid_Key - Invalid API key
	// });	
	// 
	// return;
	
	
	var template_name = m.template;
	
	var template_content = [];
	
	var today = new Date();
		
	var orderNo = m.stripe_id;
	
	console.log ("From Mandrill - " + JSON.stringify(m));
		
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
					
					// _log ("mandril" , message , 1);
					// return;
	
	mandrill_client.messages.sendTemplate({ "template_name": template_name, 
											"template_content": template_content, 
											"message": message, 
											"async": true, 
											"ip_pool": "Main Pool", 
											"send_at": email_date // moment().add('minutes', 1).utc() :
										}, 
											
											function(result) {
												
														m.mandrill_id = result._id;
														
														deferred.resolve (m);
														
													}, function(e) {
													    // Mandrill returns the error as an object with name and message keys
														deferred.resolve (e);
														
													    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
													    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
													}
												);
	
		return deferred.promise;	
	
}

var Test = function () {
	
}

Test.prototype.channelCreate = function(req, res) {
	
	var _a = "crating a channel";
	 
	console.log (_a);
	
	var channel = {
	/*

	Name
	type { open, closed, private }
	Location [lon,lat]
	Radius
	Subscribers
	Messages
	*/	
	  name: "#testchannel",//""String"",
	  type: "o",//String,
	  loc: [ 4.471547, 51.914227 ],
	  radius: 10,//Number,
	  //subscribers: [],
	  //messages: [],
	  ttl : moment().add('hours', 1).format()
	};
	
	//var action = 'http://bontebox.com:3500/channels/echo?var=hello';
	var action = 'http://bontebox.com:3500/channels/create';
	
	
	rest.post( action , {
	
	  async : false,
	  data : channel
	  
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

Test.prototype.channelFind = function(req, res) {
	
	var _a = "finding a channel";
	 
	console.log (_a);
	
	var channel = {
		_id : "531fa255fe1f06701415bfe6"
	};
	
	//var action = 'http://bontebox.com:3500/channels/echo?var=hello';
	var action = 'http://bontebox.com:3500/channels/find';
	
	rest.post( action , {
	
	  async : false,
	  data : channel
	  
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

Test.prototype.channelFindNear = function(req, res) {
	
	var _a = "finding a channel Near";
	 
	console.log (_a);
	
	var channel = {
		loc : [ "4.471547" , "51.914227" ] 
	};
	
	//var action = 'http://bontebox.com:3500/channels/echo?var=hello';
	var action = 'http://bontebox.com:3500/channels/findNear';
	
	rest.post( action , {
	
	  async : false,
	  data : channel
	  
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

Test.prototype.channelDelete = function(req, res) {
	
	var _a = "deleting a channel";
	 
	console.log (_a);
	
	var channel = {
	  _id : "531fa2e38c15679414e39527"
	};
	
	//var action = 'http://bontebox.com:3500/channels/echo?var=hello';
	var action = 'http://bontebox.com:3500/channels/delete';
	
	rest.post( action , {
	
	  async : false,
	  data : channel
	  
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

Test.prototype.channelEcho = function(req, res) {
	
	var _a = "Echo a channel";
	 
	console.log (_a);
	
	rest.get('http://bontebox.com:3500/channels' , {
	
	  async : false,
	  data : {name : "#testchannel"}
	  
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

Test.prototype.unsubscribe = function(req, res) {
	
	var _a = "un-subscribe a channel";
	 
	console.log (_a);
	
	var channel = {
		channel : { _id : "531fa255fe1f06701415bfe6" },
		user : { _id : "531fa255fe1f06701415bfe6" }
	};
	
	//var action = 'http://bontebox.com:3500/channels/echo?var=hello';
	var action = 'http://bontebox.com:3500/channels/unsubscribe';
	
	rest.post( action , {
	
	  async : false,
	  data : channel
	  
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

Test.prototype.subscribe = function(req, res) {
	
	var _a = "subscribe a channel";
	 
	console.log (_a);
	
	var channel = {
		channel : { _id : "531fa255fe1f06701415bfe6" },
		user : {"__v":0,"name":"Ilia Ridge","email":"test2@bontebox.com","_id":"531fff2bcd2a94c61a615901","loc":[4.471547,51.914227],"subscriptions":[]}
	};
	
	//var action = 'http://bontebox.com:3500/channels/echo?var=hello';
	var action = 'http://bontebox.com:3500/channels/subscribe';
	
	// console.log (channel);
	// return;
	
	
	rest.post( action , {
	
	  async : false,
	  data : channel
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

Test.prototype.channelPostMessage = function(req, res) {
	
	var _a = "posting a message to a channel a channel";
	 
	console.log (_a);
	
	var m = {
		user : {"__v":0,"name":"Ilia Ridge","email":"test@bontebox.com","_id":"531fff2bcd2a94c61a615901","loc":[4.471547,51.914227],"subscriptions":[]} ,
		channel : { _id : "531fa255fe1f06701415bfe6" } ,
		message : { body : "Hello from the first message" , type : 1 },
	  	timestamp : moment().format()
	};
	
	//var action = 'http://bontebox.com:3500/channels/echo?var=hello';
	var action = 'http://bontebox.com:3500/channels/post';
	
	
	rest.post( action , {
	
	  async : false,
	  data : m
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

Test.prototype.userCreate = function(req, res) {
	
	var _a = "crating a user";
	 
	console.log (_a);
	
	var user = {
	/*

	Name
	type { open, closed, private }
	Location [lon,lat]
	Radius
	Subscribers
	Messages
	*/	
	  name: "Ilia Ridge",//""String"",
	  autogoin : true,//String,
	  loc: [ 4.471547, 51.914227 ],
	  email: "test@bontebox.com",//Number,
	};
	
	//var action = 'http://bontebox.com:3500/channels/echo?var=hello';
	var action = 'http://bontebox.com:3500/users/create';
	
	
	rest.post( action , {
	
	  async : false,
	  data : user
	  
	  
	}).on('complete', function(data, response) {
		
		console.log(_a + " complete: " + JSON.stringify(data));
	  
	});
}

var test = new Test();

Test.prototype.testMeetup = function(req, res) {

	meetup.getOpenEvents({ 'lon' : '-118.420615799005' ,  'lat' : '34.04430982618545', 'radius' : '100' , 'limited_events' : true  }, function(err,events) {
		console.log(events.results[0]);
		
		// _.each (events.results, function (ev) {
		// 	if (ev.distance < 20)
		// 	  console.log(ev.name + ' ' + ev.distance + ev.group.name + ' ' + (ev.venue ? JSON.stringify([ev.venue.lat , ev.venue.lon ]) : "NONE"));
		// });
	});
	
}


//test.channelCreate ();
//test.channelFind ();
//test.channelFindNear ();
//test.channelDelete();
//test.channelEcho ();
//test.subscribe ();
//test.unsubscribe ();
//test.channelPostMessage();
//test.userCreate ();
test.testMeetup();