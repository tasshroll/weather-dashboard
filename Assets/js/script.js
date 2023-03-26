var city = "Flagstaff";
var apiKey = "3d8bc7dbc26cedc603210d72caafa151";
var city = "Flagstaff";
var stateCode = "AZ"
var countryCode = "US"
// get lat long of Flagstaff using Geocoding API
var lat = 0;
var long = 0;

//Call Open Weather with a City and get the lat and long coordinates
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var getLatLong = function () {
    console.log("In getLatLong");
    var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5' + '&appid=' + apiKey;
    //+ city + stateCode + '&limit=5' + 'apiKey';
    http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
    console.log("GeoCodeURL is", geoCodeUrl);
    fetch(geoCodeUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    var output = '';
                    //display the city's lat and long
                    for (let i = 0; i < data.length; i++) {
                        output += '<li>' + data[i].name +  ', ' + data[i].country + ' Lat  ' + data[i].lat + ' Long ' + data[i].lon + '</li>';
                    }
                    var cityLatLonEl = document.getElementById('cities');
                    cityLatLonEl.innerHTML = output;
                    console.log("cityLatLonEl is", cityLatLonEl);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

getLatLong();
