var models;
function Util( _inject) {
 models=_inject;
}

Util.prototype.syncLoop=function (e,t,n){var r=0,i=false,s=false;var o={next:function(){if(i){if(s&&n){n()}return}if(r<e){r++;t(o)}else{i=true;if(n)n()}},iteration:function(){return r-1},"break":function(e){i=true;s=e}};o.next();return o}
Util.prototype.mapToUser=function (e){var t=new models.MeetupMember({bio:e.bio,birthday:e.birthday,Country:e.Country,City:e.City,State:e.State,email:e.email,gender:e.gender,hometown:e.hometown,id:e.id,lang:e.lang,joined:e.joined,settings:e.settings,lat:e.lat,lon:e.lon,name:e.name,photo:e.photo,visited:e.visited,loc:[e.lon,e.lat]});var n={};n.User=new models.User({name:e.name,bio:e.bio,email:e.email,sourceType:"meetup",sourceId:e.id, loc:{"Longitude" : e.lon,"Latitude" :e.lat}  } );n.MeetupMember=t;return n}
Util.prototype.mapToChannel =function (e){var t=new models.Channel({partnerId:"meetup",name:e.EventName,image:e.Photo_url,loc:{"Longitude" : e.lon,"Latitude" :e.lat}});return t}

///-------------------------------------------------------
module.exports = {"Util" : Util};
///---

