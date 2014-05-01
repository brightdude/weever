var mongoose = require('mongoose');

function Messages() {
	// mongoose.connect('localhost', 'data');
	//mongoose = db;
	
}

var messageSchema = mongoose.Schema({
  name: String,
  content : String,
  channel: String,
  timestamp : Date
});


Messages.prototype.index = function(req, res){
  res.send("here is a list of messages");
};

module.exports = Messages;
