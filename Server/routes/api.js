var models;
var util = require('./Util');
var Lib = new util.Util(models);

var api = function (_inject){models=_inject;}
//===========================================================
api.prototype.user.create=function (user){}
api.prototype.user.update=function (user){}
api.prototype.user.login=function (user){}
api.prototype.user.logout=function (user){}
api.prototype.user.channel =function(user){}
api.prototype.user.channel.loc=function (user,loc){}
api.prototype.user.channel.post=function (channel,massage){}
api.prototype.user.message.list=function (user){}
api.prototype.user.message.post=function (message,alias){}
api.prototype.user.message.delete=function (message){}
api.prototype.user.message.byChannels=function (user,channel){}
api.prototype.user.aliases=function (user){}
api.prototype.user.aliases.change=function (user,aliases){}
api.prototype.user.settings=function (user){}
api.prototype.user.settings.change=function (user, settings){}
api.prototype.user.content=function (user,channel){}
api.prototype.user.content.post=function (user,content){}
api.prototype.user.delete=function (user){}
//===========================================================
api.prototype.channel.create=function (channel){}
api.prototype.channel.update=function (channel){}
api.prototype.channel.loc=function (loc){}
api.prototype.channel.user.list=function (channel){}
api.prototype.channel.post=function (channel,massage){}
api.prototype.channel.details=function (channel,limit,pagesize,filters){}// this includes content only but...
api.prototype.channel.content=function (channel){}
api.prototype.channel.delete=function (channel){}
//===========================================================
api.prototype.meetup.loc=function (loc){}
api.prototype.meetup.post=function (meetup,massage){}
api.prototype.meetup.details=function (meetup){}
api.prototype.meetup.member.details=function (member){}
//===========================================================
api.prototype.content.details=function (content){}
api.prototype.content.delete=function (content){}
//===========================================================
api.prototype.message.details=function (message){}
api.prototype.message.reply=function (message,reply){}
//===========================================================