$(document).ready(function() {
  $('hr').hide();
  $('#switch').hide();
  if (navigator.geolocation) {
    var currentPosition = '';
    navigator.geolocation.getCurrentPosition(function(position) {
      currentPosition = position;
      // set lat and lon
      var latitude = currentPosition.coords.latitude;
      var longitude = currentPosition.coords.longitude;
      //console.log(latitude, longitude);
      var url = 'http://api.apixu.com/v1/current.json?key=f1ea9399ff784da6978123516183004';
      $.getJSON(url + '&q=' + latitude + ',' + longitude, function(data) {
        var data = JSON.stringify(data);
        var json = JSON.parse(data);

        var country = json.location.country;
        var city = json.location.name;
        var state = json.location.region;

        var temp = json.current.temp_c;
        var tempF = json.current.temp_f;
        var lastUpdate = json.current.last_updated.replace('-', ' ');

        var wind = json.current.wind_kph;
        var humidity = json.current.humidity;
        var time = json.location.localtime.split(' ')[1];
        var cloud = json.current.cloud;
        //console.log(data);

        $('#weather').html(city + ', ' + state + ', ' + country);

        if (temp < 18) {
          $('.grey-jumbo').css({
            backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/03/15/14/47/berlin-3228404_960_720.jpg)'
          });
          $('#temp').html("<h1>It's pretty could today...</h1>");
        } else if (temp > 10 && temp < 28) {
          $('.grey-jumbo').css({
            backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/01/27/09/50/sky-3110771_960_720.jpg)'
          });
          $('#temp').html("<h1>It's sunny day today...</h1>");
        } else {
          $('.grey-jumbo').css({
            backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/01/28/18/25/architecture-3114360_960_720.jpg)'
          });
          $('#temp').html("<h1>It's hot day today...</h1>");
        }

        //toggle temp
        $('#info1').html(time);
        $('#info2').html('Wind ' + wind + ' kph');
        $('#info3').html(temp + '&#8451');

        $('hr').show();
        $('#switch').show();

        var yes = true;
        $('#switch').on('click', function() {
          if (yes) {
            $('#info3').html(tempF + '&#8457;');
            $('#switch').html('Show in Celcius');
            yes = false;
          } else {
            $('#info3').html(temp + '&#8451');
            $('#switch').html('Show in Farenheit');
            yes = true;
          }
        });

        //showing sky satus
        if (cloud <= 30) {
          $('#info5').html('Clear Sky');
        } else {
          $('#info5').html('Cloudy Sky');
        }
        $('#info6').html('Humidity ' + humidity);
      });
    });
  }
});
