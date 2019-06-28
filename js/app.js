var $streamers = $(".streamers-list");

//global variables
var streamers = ["ESL_SC2", "ESL_CSGO", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "test_channel", "cretetion", "sheevergaming", "TR7K", "OgamingSC2", "monstercat", "pink_sparkles"];

var x = 0;

streamers.forEach(function(streamer){
  ajax(streamer);
});

var baseURL = "https://api.twitch.tv/kraken";

function prepareURL(type, streamer){
  return baseURL + "/" + type + "/" + streamer; 
}

function ajax(streamer){
  $.ajax({
    url: prepareURL("streams", streamer),
    type: 'GET',
    dataType: 'jsonp',
    headers:{
      'Client-ID': '',
    }
  })
  .done(function(response) {
    showResponse(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}
function showResponse(response){
  if(response.stream === null){
    url = response._links.channel.substr(38);
    updateOfflineUsers();
  }else if(response.status == 422 || response.status == 404){
    status = response.message;
    updateHTML(".unavailable");
  }else{
    if(response.stream.channel.logo !== null){
      picture = 'url("'+response.stream.channel.logo+'")';
    }else{
      picture = 'url("https://cdn.rawgit.com/ayoisaiah/freeCodeCamp/master/twitch/images/placeholder-2.jpg")';
    }
    url = response._links.channel.substr(38);
    status = "<a href='https://twitch.tv/" + url + "' target='_blank'" + "'>" + response.stream.channel.display_name +  "</a>" + " is currently streaming " + response.stream.game;
    updateHTML(".online");
  }
}
function updateOfflineUsers(){
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams/'+url,
    type: 'GET',
    dataType: 'jsonp',
    data: {format: 'json'}
  })
  .done(function(response) {
    status = "Channel " + "'<a href='" + response.url + "' target='_blank'" + "'>" + response.display_name + "</a>'" + " is currently offline";
    if(response.logo !== null){
      picture = 'url("'+response.logo+'")';
    }else{
      picture = 'url("https://cdn.rawgit.com/ayoisaiah/freeCodeCamp/master/twitch/images/placeholder-2.jpg")';
    }
    updateHTML(".offline");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}
function updateHTML(section){
  $(section).html(''                                                  +
  '<div class="twitch">'                                              +
    '<div class="row">'                                               +
      '<div class="one-third column">'                                +
        '<div class="image-holder" id="user-image-' + x + '">'        +
        '</div>'                                                      +
      '</div>'                                                        +
      '<div class="two-thirds column">'                               +
        '<span class="status-message">' + status + '</span>'          +
      '</div>'                                                        +
    '</div>'                                                          +
  '</div>');
  if (section == ".online" || section == ".offline") { //If users are online or offline, load profile images
			$("#user-image-" + x).css({
				background: picture,
				'background-size': '55px'
			});
		}
		x++;
}
function onlineUsers(){ // display online users
  $(".offline-users, .all-users").removeClass('focus');
  $(".online-users").addClass('focus');
  $(".offline, .unavailable").addClass('hidden');
  $(".online").removeClass('hidden');
}
function offlineUsers(){
  $(".online-users,.all-users").removeClass('focus');
  $(".offline-users").addClass('focus');
  $(".online, .unavailable").addClass('hidden');
  $(".offline").removeClass('hidden');
}
$(".online-users").click(function(){
    console.log('online button clicked');
    onlineUsers();
});
$(".offline-users").click(function(){
    console.log('offline button closed');
    offlineUsers();
});
