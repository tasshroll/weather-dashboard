
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
    var cityToSearch = userCityEl.value.trim();
    console.log("City to search for is: ", cityToSearch);
    // Retreive latitude and longitude of User City
    getLatLong(cityToSearch);
}

////////////////////
// getLatLong
//
//Call Open Weather with a City and get the lat and long coordinates
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var getLatLong = function (city) {
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
                    //Log the first 5 city's found in Open Weather
                    for (let i = 0; i < data.length; i++) {
                        lat = data[i].lat;
                        long = data[i].lon;
                        let shLat = lat.toFixed(2);
                        let shLong = long.toFixed(2);
                        let name = data[i].name;
                        let state = data[i].state;
                        let country = data[i].country;
                        console.log(name + ', ' + state + ', ' + country + ' Lat  ' + shLat + ' Long ' + shLong);
                    }
                    console.log("City to search for is ", city);


                    //Clear weather icon
                    var iconElement = document.getElementById("icon");
                    var iconImgEl = iconElement.querySelector("img");
                    if (iconElement.contains(iconImgEl)) {
                        iconElement.removeChild(iconImgEl); //remove child from the img element
                    }

                    // Print City, State and Date on Web Page
                    let today = dayjs();
                    let dateOutput = today.format('M/D/YYYY');
                    let state = data[0].state;
                    let cityOutput = city + ", " + state;
                    var currrentCityEl = document.getElementById('cities');
                    currrentCityEl.innerHTML = cityOutput + " (" + dateOutput + ")";

                    //Get weather using first City in API response
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

////////////////////
// getWeatherApi
// called by getLatLong
// Call OpenWeather API  and pass in the lat long from first city
var getWeatherApi = function (lat, long) {
    console.log("Inside getWeatherApi fetching weather for lat-long of ", lat, long);
    // insert lat long into API
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var units = "imperial";
    var querySelectors = '&lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=' + units;
    var currWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?' + querySelectors;

    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?' + querySelectors;
    // var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +
    //     '&lon=' + long + '&appid=' + apiKey + '&units=' + units;
    // var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+{lat}+'&lon='+{long}+'&appid='+{apiKey}+'&units='+{units};

    console.log("Current Weather API URL is ", currWeatherApiUrl);
    console.log("Forecast API URL is ", forecastApiUrl);

    fetch(currWeatherApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    console.log("Current weather conditions for Current City is", data);
                    // Display Icon by City and Date










                    // Display the current temperature for city
                    var outputTemp = '';
                    var city = data.name;
                    let cityTemp = data.main.temp;
                    let windSpeed = data.wind.speed;
                    let humidity = data.main.humidity;
                    let date = data.dt_text;
                    let icon = data.weather[0].icon;

                    // outputTemp += '<span>' + cityTemp + '</span>';
                    console.log("Date: ", date, "City: ", city, " curr temp: ", cityTemp, " curr wind : ", windspeed, " curr humidity:", humidity);

                    //Query Selectors
                    var temperatureEL = document.getElementById("temperature");
                    var windSpeedEL = document.getElementById("windspeed");
                    var humidityEL = document.getElementById("humidity");

                    //Display icon
                    let iconDisplay = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                    console.log("Icon is ", iconDisplay);
                    var iconElement = document.getElementById("icon");
                    const iconImg = document.createElement("img");
                    iconImg.setAttribute("src", iconDisplay);
                    iconElement.appendChild(iconImg);



                    temperatureEL.innerHTML = "Temperature: " + cityTemp + '\u00B0F';
                    windSpeedEL.innerHTML = "Windspeed: " + windSpeed + " MPH";
                    humidityEL.innerHTML = "Humidity: " + humidity + "%";

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });



    fetch(forecastApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    // Display the first city temperature
                    // var outputTemp = '';
                    // var city = data.city.name;
                    // let cityTemp = data.list[0].main.temp;
                    // let windSpeed = data.list[0].wind.speed;
                    // let humidity = data.list[0].main.humidity;
                    // let date = data.list[0];
                    // // outputTemp += '<span>' + cityTemp + '</span>';
                    // console.log("Date is ", date);
                    // console.log("Temperature is ", cityTemp);
                    // console.log("Windspeed is ", windSpeed);
                    // console.log("Humidity is ", humidity);

                    // var temperatureEL = document.getElementById("temperature");
                    // var windSpeedEL = document.getElementById("windspeed");
                    // var humidityEL = document.getElementById("humidity");

                    // temperatureEL.innerHTML = "Temperature: " + cityTemp + '\u00B0F';
                    // windSpeedEL.innerHTML = "Windspeed: " + windSpeed + " MPH";
                    // humidityEL.innerHTML = "Humidity: " + humidity + "%";
                    // Get the 5 day forecast
                    for (let i = 3; i < data.list.length; i += 8) {
                        // the forecast data is for every 24 hours in 3 hour increments
                        // grab the 4th data point out of the 8 to get temperature at 3PM
                        let forecastTemp = data.list[i].main.temp;
                        let date = data.list[i].dt_txt;
                        console.log("Future forecasted high temp for ", date, " is ", forecastTemp);
                    }
                });

            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
} // END of getWeatherApi


// Get user input for a City
formUserEl.addEventListener('submit', formSubmitHandler);

