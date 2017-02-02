// console.log('working');
var $streamers = $(".streamers-list");
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
streamers.forEach(function(streamer){
  ajax(streamer);
});
function ajax(streamer){
  console.log(streamer);
  url = "https://wind-bow.gomix.me/twitch-api/streams/" + streamer + "?callback=?",
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
   }
}
function updateOfflineUsers(){

}
