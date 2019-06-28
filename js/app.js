let clientID = config.Client_ID;
let $streamers = $(".streamers-list");
let streamers = ["ESL_SC2", "ESL_CSGO", "freecodecamp", "storbeck",
                "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger",
                "noobs2ninjas", "beohoff", "brunofin", "comster404",
                "test_channel", "cretetion", "sheevergaming", "TR7K",
                "OgamingSC2", "monstercat", "pink_sparkles"];
let x = 0;

let baseURL = "https://api.twitch.tv/kraken";
streamers.forEach(function(streamer){
  ajax(streamer);
});


function prepareURL(type, name){
    return baseURL + "/" + type + "/" + name;
}

function ajax(streamer){
  $.ajax({
    url: prepareURL("streams", streamer),
    type: 'GET',
    dataType: 'json',
    headers: {
        'Client-ID': clientID,
    },
    success: function(data){
        console.log(data);
    },
    error: function(error){
        console.log(error);
    }
  })
}
function showResponse(response){
  if(response.stream === null){

  }else if(response.status == 422 || response.status == 404){

  }else{
    if(response.stream.channel.logo !== null){
    }else{

    }
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

  })
  .fail(function() {

  })
}
