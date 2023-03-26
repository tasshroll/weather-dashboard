
//personal OpenWeather API Key
var apiKey = "3d8bc7dbc26cedc603210d72caafa151";
// var city = "Flagstaff";
// var stateCode = "AZ"
// var countryCode = "US"
var latitude = 0;
var longitude = 0;

// Query Selectors
var formUserEl = document.querySelector('#city');
var userCityEl = document.querySelector('#user-city');
var btnCitySearchEl = document.querySelector('.btn');

var formSubmitHandler = function (event) {
    event.preventDefault();

    console.log("Form submitted");
    var cityToSearch = userCityEl.value.trim();
    console.log("City to search for is: ", cityToSearch);
    // Retreive latitude and longitude of User City
    getLatLong(cityToSearch);
}


//Call Open Weather with a City and get the lat and long coordinates
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var getLatLong = function (city) {
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
                        let shLat = lat.toFixed(2);
                        let shLong = long.toFixed(2);
                        let name = data[i].name;
                        let state = data[i].state;
                        let country=data[i].country;
                        // output += '<li>' + data[i].name + ', ' + data[i].country + ' Lat  ' + lat + ' Long ' + long + '</li>';
                        output += '<li>' + name + ', ' + state + ', ' + country + ' Lat  ' + shLat + ' Long ' + shLong + '</li>';
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

// Call OpenWeather API  and pass in the lat long from first city
var getWeatherApi = function (lat, long) {
    console.log("Inside getWeatherApi fetching weather for lat-long of ", lat, long);
    // insert lat long into API
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var units = "imperial";
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +
        '&lon=' + long + '&appid=' + apiKey + '&units=' + units;
    // var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+{lat}+'&lon='+{long}+'&appid='+{apiKey}+'&units='+{units};
   
    console.log("API URL is ", apiUrl)

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // Display the first city temperature
                    var outputTemp = '';
                    var city = data.city.name;
                    let cityTemp = data.list[0].main.temp;
                    let windSpeed = data.list[0].wind.speed;
                    let humidity = data.list[0].main.humidity;
                    outputTemp += '<span>' + cityTemp + '</span>';
                    console.log("Temperature is ", cityTemp);
                    console.log("Windspeed is ", windSpeed);
                    console.log("Humidity is ", humidity);

                    var temperatureEL = document.getElementById("temperature");
                    var windSpeedEL = document.getElementById("windspeed");
                    var humidityEL = document.getElementById("humidity");

                    temperatureEL.innerHTML = "Temperature for first city " + city + " is " + outputTemp + " degrees Fahrenheit";                    temperatureEL.innerHTML = "Temperature for first city " + city + " is " + outputTemp + " degrees Fahrenheit";
                    windSpeedEL.innerHTML = "Windspeed is " + windSpeed + " mph";
                    humidityEL.innerHTML = "Humidity is " + humidity;

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};

// Get user input for a City
formUserEl.addEventListener('submit', formSubmitHandler);

