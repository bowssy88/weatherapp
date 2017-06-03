var geography = document.getElementById("location");
// Step 1: show a loading spinner
document.getElementById("loader").style.display = "block";

// Step 2: get the location
myLocation();

function myLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
    geoError();
  }
}


// if navigator.geolocation fails
function geoError(err) {
  // hide the spinner
  document.getElementById("loader").style.display = "none";
document.getElementById("myDiv").style.display = "block";

  // show an error
  geography.innerHTML = "Unable to retrieve your location " + err.message;
console.log(geography);
}

// if navigator.geolocation succeeds, embed a weather API call to the body of the page to get the weather
function geoSuccess(position) {
  //this object holds all information about your position
  console.log(position);

  //get lat and long from that, and use them in your call below
  var lat = position.coords.latitude;
  var long = position.coords.longitude;

  // create a script with src = to the weather API URL
  // use 'showTheWeather' as the function to call when it is complete
  var scriptEl = document.createElement("script");
  scriptEl.setAttribute(
    "src",
    "https://api.darksky.net/forecast/a70fe9d9a60d04a1e71dd077980ac76a/" +
    lat + "," + long + "?exclude=[minutely,hourly,daily,alerts,flags]&callback=showTheWeather"
  );

  // append the script to the page so it can run
  document.body.appendChild(scriptEl);
}

// get the weather data and write it to the page
function showTheWeather(data) {

  // process all the weather data
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
  document.getElementById("icon").innerHTML = icon;

  // show the final page
  showPage();
}

// hide the loader and show the weather
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

// get the user's city / location details
function set_userLocationDetails(lat, lng) {
  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng},
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

// get the icon name
function get_weatherIcon(icon) {
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
  }
}
