module.exports = function(mongoose) {
var messageSchema = mongoose.Schema({
	fromUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
	toUser : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
	message : String,
	timestamp : { type: Date, default: Date.now }
});

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
  Description : String,
  Event_hosts :[event_hostsSchema],
  Event_url : String,
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

var userSchema = mongoose.Schema({
  avatar : String,
  cover  : String,
  name: String,
  title : String,
  bio 	: String,
  email : String,
  device : String,
  pushId : String,
  sourceType:String,
  sourceId:String,
  subscriptions : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channels' }],
  timestamp : { type: Date, default: Date.now },
  settings : String,
  loc: []
});
userSchema.index({ loc: '2d' });


   var models = {
	 ChannelPost : mongoose.model('channelPostSchema' , channelPostSchema),
	 User : mongoose.model('userSchema' , userSchema),
	 Message : mongoose.model('messageSchema' , messageSchema),
	 Event_hostsSchema : mongoose.model('event_hostsSchema' , event_hostsSchema),
	 VenueSchema: mongoose.model('venueSchema' , venueSchema),
	 MeetupChannel : mongoose.model('meetupChannelSchema', meetupChannelSchema),
	 MeetupMember : mongoose.model('meetupMemberSchema', meetupMemberSchema),
    };
    return models;
}

