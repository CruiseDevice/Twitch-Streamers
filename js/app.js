console.log('working');
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
streamers.forEach(function(streamer){
  ajax(streamer);
});
function ajax(streamer){
  console.log(streamer);
  url = "https://wind-bow.gomix.me/twitch-api/channels/" + streamer + "?callback=?",
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
    console.log(url);
    console.log(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });


}
