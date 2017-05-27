myLocation();

var getLocation = new XMLHttpRequest();
var geography = document.getElementById("location");


function myLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){

      //this object holds all information about your position
      console.log(position);
      //get lat and long from that, and use them in your call below
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var scriptEl = document.createElement("script");
    scriptEl.setAttribute(
      "src",
      "https://api.darksky.net/forecast/a70fe9d9a60d04a1e71dd077980ac76a/" + lat + "," + long + "?exclude=[minutely,hourly,daily,alerts,flags]&callback=myJsonpCallback"
    );
    document.body.appendChild(scriptEl);
    });

  } else {
    geography.innerHTML = "Location Tracking not Possible.";
  }
}


var set_userLocationDetails = function (lat, lng) {

        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);

        geocoder.geocode({
                'latLng': latlng
            },
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    if (results[1]) {

                        document.getElementById("newloc").innerHTML = "Location: "+ results[1].formatted_address;
                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
    }





var get_weatherIcon = function (icon) {

        switch (icon) {
            case "clear-day":
                return 'sunny';

            case "clear-night":
                return 'clear-moon';

            case "cloudy":
                return 'cloudy';

            case "partly-cloudy-day":
                return 'partly-cloudy-day';

            case "partly-cloudy-night":
                return 'partly-cloudy-night';

            case "thunderstorm":
                return 'thunder-storm';

            case "rain":
                return 'rainy';

            case "snow":
                return 'flurries';

                //TODO:
            case "sleet":
                return 'TODO';

            case "wind":
                return 'TODO';

            case "fog":
                return 'TODO';

            case "hail":
                return 'TODO';

            case "tornado":
                return 'TODO';

            default:
                return;
        };
    };


window.myJsonpCallback = function(data) {
  console.log(data);
  var weatherInfo = data;
var icon = weatherInfo.currently.icon;
var className = get_weatherIcon(icon);
var classIconToDisplay = document.getElementsByClassName(className);
classIconToDisplay[0].style.display = 'block';
set_userLocationDetails(weatherInfo.latitude, weatherInfo.longitude);
  console.log(weatherInfo);
  var location = weatherInfo.timezone; //this variable will hold the location
  document.getElementById("location").innerHTML = "Timezone: "+ location;
 var temperature = weatherInfo.currently.temperature;
var celsius = ((temperature -32) *5/9).toFixed(2) ;
document.getElementById("temperature").innerHTML = celsius + " °C";
var icon = weatherInfo.currently.icon;
document.getElementById("icon").innerHTML = icon;
};


//var icon = weatherInfo.currently.icon;
// document.getElementById("icon").innerHTML = icon;

// document.getElementById("currentWeather").style.display = 'none';

//add victors case for weather icon



// api key :   a70fe9d9a60d04a1e71dd077980ac76a
// api call : https://api.darksky.net/forecast/a70fe9d9a60d04a1e71dd077980ac76a/37.8267,-122.4233?exclude=[minutely,hourly,daily,alerts,flags]
