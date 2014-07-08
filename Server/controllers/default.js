var mongoose = require('mongoose');
var models = require('../routes/valueObjects')(mongoose);

var vMeetup = require('../routes/vMeetup');
var vUser = require('../routes/vUser');
var vChannel = require('../routes/vChannel');

var MeetupService= new vMeetup.Meetup(models);
var UserService= new vUser.User(models);
var ChannelService= new vChannel.Channel(models);

var util = require('../routes/Util');
var Lib = new util.Util(models);

//====================================
var db = mongoose.connection;
db.on('error', console.error);
mongoose.connect('localhost', 'data');
//====================================

exports.install = function(framework) {
	framework.config['allow-compile-css']=false;
	console.dir('allow-compile-css:'+framework.config['allow-compile-css']);
    framework.route('/', view_app);
	framework.route('/appMain', view_appMain);
	framework.route('/pref', view_pref);
	//InitModel();
};

var model = [
    { alias: 'Peter', information: { age: 29, sex: 'male' }, tags: ['JavaScript', 'CSS', 'HTML', 'node.js'] },
    { alias: 'Jozef', information: { age: 26, sex: 'male' }, tags: ['Java', 'Objective-C', 'C#'] },
    { alias: 'Lucia', information: { age: 32, sex: 'female' }, tags: ['copywriting'] }
];

function view_app() {

    var self = this;
	self.layout('_layout');
	//self.json(model);
    self.view('app',model);
}
function InitModel(){
	models.Channel.find({}, function (err, _found) {
	for (var i = 0; i < _found.length; i++ ) {
	_model.push(_found[i].name)
		}
	});
}

function view_appMain() {
    var self = this;
	self.layout('_layout');
    self.view('appMain');
	
}
function view_pref() {
    var self = this;
	self.layout('_layout');
    self.view('pref');
}
function logout() {
	var self = this;
	self.res.cookie(self.config.cookie, '', new Date().add('y', -1));
	self.redirect('/');
}
