// console.log('working');
var $streamers = $(".streamers-list");
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var x = 0;

streamers.forEach(function(streamer){
  ajax(streamer);
});
function ajax(streamer){
  console.log(streamer);
  url = "https://wind-bow.gomix.me/twitch-api/streams/" + streamer + "?callback=?",
  console.log(url);
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    data: {
      action: 'query',
      format:'json'
    }
  })
  .done(function(response) {
    // console.log(url);
    // console.log(response);
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
  console.log(response);
  if(response.stream === null){
    url = response._links.channel.substr(38);
    // console.log(url);
    updateOfflineUsers();
  }else if(response.status == 422 || response.status == 404){
    status = response.message;
    updateHTML(".unavailable");
  }else{
    if(response.stream.channel.logo !== null){
      picture = 'url("'+response.stream.channel.logo+'")';
    }else{

    }
    url = response._links.channel.substr(38);
    status = "<a href='https://twitch.tv/" + url + "' target='_blank'" + "'>" + response.stream.channel.display_name +  "</a>" + " is currently streaming " + response.stream.game;
    updateHTML(".online");
  }
}
function updateOfflineUsers(){
  $.ajax({
    url: 'https://wind-bow.gomix.me/twitch-api/channels/'+url,
    type: 'GET',
    dataType: 'jsonp',
    data: {format: 'json'}
  })
  .done(function(response) {
    console.log(response);
    status = "Channel " + "'<a href='" + response.url + "' target='_blank'" + "'>" + response.display_name + "</a>'" + " is currently offline";
    if(response.logo !== null){
      picture = 'url("'+response.logo+'")';
    }else{

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
function updateOfflineUsers(){

}
