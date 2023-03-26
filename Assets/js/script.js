var city = "Flagstaff";
var apiKey = "3d8bc7dbc26cedc603210d72caafa151";
var city = "Flagstaff";
var stateCode = "AZ"
var countryCode = "US"
// get lat long of Flagstaff using Geocoding API
var latitude = 0;
var longitude = 0;

//Call Open Weather with a City and get the lat and long coordinates
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var getLatLong = function (lat, long) {
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
                        lat = data[i].lat;
                        long = data[i].lon;
                        output += '<li>' + data[i].name + ', ' + data[i].country + ' Lat  ' + lat + ' Long ' + long + '</li>';
                    }
                    var cityLatLonEl = document.getElementById('cities');
                    cityLatLonEl.innerHTML = output;
                    console.log("cityLatLonEl is", cityLatLonEl);
                    // Retreive weather for the first City in the returned list using lat and long
                    lat = data[0].lat;
                    long = data[0].lon;
                    getWeatherApi(lat, long);

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
}

var getWeatherApi = function (lat, long) {
    console.log("Inside getWeatherApi fetching weather for lat-long of ", lat, long);
    // insert lat long into API
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var units = "imperial";
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +
        '&lon=' + long + '&appid=' + apiKey + '&units=' + units;
    console.log("API URL is ", apiUrl)

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // Display the first cities temperature
                    var output = '';
                    output += '<span>' + data.list[0].main.temp + '</span>';
                    console.log(output);
                    var weatherEL = document.getElementById("weather");
                    weatherEL.innerHTML = "Temp for first city is " + output + " degrees Fahrenheit";
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};


getLatLong(lat = latitude, long = longitude);

