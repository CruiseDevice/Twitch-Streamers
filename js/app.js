$(document).ready(function(){
    let clientID = config.Client_ID;
    let $streamers = $(".streamers-list");
    let streamers = ["ESL_SC2", "ESL_CSGO", "freecodecamp", "storbeck",
                    "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger",
                    "noobs2ninjas", "beohoff", "brunofin", "comster404",
                    "test_channel", "cretetion", "sheevergaming", "TR7K",
                    "OgamingSC2", "monstercat", "pink_sparkles"];

    let x = 0;
    let baseURL = "https://api.twitch.tv/kraken";
    let api_streamers = [];

    streamers.forEach(function(streamer, index){
        ajax(streamer, index);
    });

    function prepareURL(type, name){
        return baseURL + "/" + type + "/" + name;
    }

    function ajax(streamer, index){
      $.ajax({
        url: prepareURL("streams", streamer),
        type: 'GET',
        dataType: 'json',
        headers: {
          'Client-ID': clientID,
        },
        success: function(data){
          api_streamers[index] = data;
        },
        error: function(error){
          console.log(error);
        }
      });
    };

    let all = $('#all-users');
    let online = $('#online-users');
    let offline = $('#offline-users');

    let all_section = $('.online');

    all.on('click', function(){
        showAll();
    });

    online.on('click', function(){
        showOnline();
    });

    offline.on('click', function(){
        showOffline();
    });

    function showAll(){
        console.log('showall clicked');
        all_section.empty();
        api_streamers.forEach(function(streamer){
            all_section.append(streamer._links.channel + '\n');
        });
    }

    function showOnline(){
        all_section.empty();
        api_streamers.forEach(function(streamer){
            if(streamer.stream !== null){
                all_section.append(streamer._links.channel + '\n');
            };
        });
    }

    function showOffline(){
        all_section.empty();
        api_streamers.forEach(function(streamer){
            if(streamer.stream === null){
                all_section.append(streamer._links.channel + '\n');
            };
        });
    }
});

