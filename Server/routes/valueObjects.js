module.exports = function(mongoose) {

var event_hostsSchema = new mongoose.Schema({
	member_id: String, 
	member_name: String
});
var venueSchema = new mongoose.Schema({
	address_1: String,
	address_2: String,
	address_3: String,
	city_state_country: String,
	lat_lon: String,
	phone: String,
	zip : String
});
var meetupChannelSchema = new mongoose.Schema({
  EventID 	: String,
  EventName : String,
  Description :String,
  Event_hosts :[event_hostsSchema],
  Event_url : String,
  Photo_url	: String,
  GroupName : String,
  GroupID 	: String,
  Distance 	: String,
  Venue		: [venueSchema],
  Created 	: String,
  Updated 	: String,
  yes_rsvp_count : String
});
var meetupMemberSchema = mongoose.Schema({
  bio: String,
  birthday : {day: String,month: String,year:String},
  Country: String, 
  City: String,
  State: String,
  email : String,
  gender : String,
  hometown : String,
  id : String,
  lang: String,
  joined : { type: Date, default: Date.now },
  settings : String,
  lat:String, lon:String,
  name: String,
  photo:{highres_link:String,photo_id:String,photo_link:String,thumb_link:String},
  visited : { type: Date, default: Date.now },
  loc: []
});
meetupMemberSchema.index({ loc: '2d' });

var messageSchema = mongoose.Schema({
	fromUser : { type: mongoose.Schema.Types.ObjectId , ref: 'User' },
	toUser : { type: mongoose.Schema.Types.ObjectId , ref: 'User' },
	message : String,
	timestamp : { type: Date, default: Date.now }
	
});

var channelSchema = mongoose.Schema({
  //ownerId: { type: mongoose.Schema.Types.ObjectId , ref: 'User' }, // owner id for now
  ownerId: {type: String , ref: 'User' },
  partnerId : String, 
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
  subscribers : [{type: String , ref: 'User' }],
  posts : [{ type: mongoose.Schema.Types.ObjectId , ref: 'ChannelPost' }],
  timestamp : { type: Date, default: Date.now },
  ttl : {type : Date , default : Date.now }
});
channelSchema.index({ loc: '2d' });

var channelPostSchema = mongoose.Schema({
  //ownerId : { type: mongoose.Schema.Types.ObjectId , ref: 'User' }, // owner id for now,
  ownerId : {type: String , ref: 'User' }, // owner id for now,
  channel : { type: String , ref: 'Channel' },
  comment : String,
  color : String,
  type : { type : Number, default : 0 },
  pin : String,
  image : String,
  sound : String,
  fileUrl : String,
  timestamp : { type: Date, default: Date.now }
});

var userSchema = mongoose.Schema({
  //_id: String,
  avatar : String,
  cover  : String,
  name: {type : String, default : '', required : true},
  title : String,
  bio 	: String,
  email : String,
  device : String,
  pushId : String,
  sourceType:String,
  sourceId:String,
  subscriptions : [{ type: mongoose.Schema.Types.ObjectId , ref: 'Channel' }],
//  channelPosts: [{ type: mongoose.Schema.Types.ObjectId , ref: 'ChannelPost' }],
  timestamp : { type: Date, default: Date.now },
  settings : String,
  loc: []
});
userSchema.index({ loc: '2d' });


   var models = {
	 ChannelPost : mongoose.model('ChannelPost' , channelPostSchema),
	 Channel : mongoose.model('Channel' , channelSchema),
	 User : mongoose.model('User' , userSchema),
	 Message : mongoose.model('Message' , messageSchema),
	 Event_Hosts : mongoose.model('Event_Hosts' , event_hostsSchema),
	 Venue: mongoose.model('Venue' , venueSchema),
	 MeetupChannel : mongoose.model('MeetupChannel', meetupChannelSchema),
	 MeetupMember : mongoose.model('MeetupMember', meetupMemberSchema),
    };
    return models;
}

