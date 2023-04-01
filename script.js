
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



// Weather Array
const cityHistory = [
    {
        city: "",
        state: "",
        lat: 0,
        long: 0,
        currTemp: 0,
        currIcon: 0,
        currWind: 0,
        currHumidity: 0,
        forecast: [
            { date: "2023-03-30", icon: "", temp: 0, wind: 0, humidity: 0 },
            { date: "2023-03-30", icon: "", temp: 0, wind: 0, humidity: 0 },
            { date: "2023-03-30", icon: "", temp: 0, wind: 0, humidity: 0 },
            { date: "2023-03-30", icon: "", temp: 0, wind: 0, humidity: 0 },
            { date: "2023-03-30", icon: "", temp: 0, wind: 0, humidity: 0 },
        ],
    }
]

// let cityHistory = [...weatherObject]; //arrray of weather objects
// let cityHistory = [];





////////////////////
// extractWeather
//
function extractWeather(currentCity, data) {

    //Log the first 5 city's found in Open Weather to console
    for (let i = 0; i < data.length; i++) {
        lat = data[i].lat;
        long = data[i].lon;
        let shLat = lat.toFixed(2);
        let shLong = long.toFixed(2);
        let name = data[i].name;
        let state = data[i].state;
        let country = data[i].country;
        // console.log(name + ', ' + state + ', ' + country + ' Lat  ' + shLat + ' Long ' + shLong);
    }

    //Clear weather icon if it exists
    var iconElement = document.getElementById("icon");
    var iconImgEl = iconElement.querySelector("img");
    if (iconElement.contains(iconImgEl)) {
        iconElement.removeChild(iconImgEl); //remove child from the img element
    }

    // Store data into local array
    cityHistory[0].city = currentCity;
    cityHistory[0].state = data[0].state;
    cityHistory[0].lat = data[0].lat;
    cityHistory[0].long = data[0].lon;


    //TODO: CHANGE SO OUTPUT IS UPDATED WITH cityHistory here once its working
    // Print City, State and Date on Web Page
    let today = dayjs();
    let dateOutput = today.format('M/D/YYYY');
    let state = data[0].state;
    let cityOutput = currentCity + ", " + state;
    var currrentCityEl = document.getElementById('cities');
    currrentCityEl.innerHTML = cityOutput + " (" + dateOutput + ")";


    // Get the rest of the data by calling getWeatherApi with first city in API response
    lat = data[0].lat;
    long = data[0].lon;
    getWeatherApi(lat, long);

} // END OF EXTRACT WEATHER


function printResults() {
    console.log("City History Array is ", cityHistory);
    // Output forecast
    for (var i = 0; i < 5; i++) {

        //TODO
        // If time add dynamic creation of this HTML for the 5 cards
        //<div class="col-12 col-md-2">
        //     <div class="card1 card-body">
        //         <div class="f-subtitle" id="f-date0">Date: </div>
        //         <div id="f-icon0"></div>
        //         <div class="sub-data">
        //             <div id="f-temp0">Temp: </div>
        //             <div id="f-wind0">Wind: </div>
        //             <div id="f-humid0">Humidity: </div>
        //         </div>
        //     </div>
        // </div>

        // Add Date
        var dateEl = document.getElementById(`f-date${i}`);
        var date = cityHistory[0].forecast[i].date;
        var formatDate = dayjs(date).format('M/D/YYYY');
        dateEl.innerHTML = formatDate;

        // Add icon to display
        let iconString = cityHistory[0].forecast[i].icon;
        // console.log("Forecast Icon String is", iconString);
        let iconDisplay = "https://openweathermap.org/img/wn/" + iconString + "@2x.png"
        var iconEl = document.getElementById(`f-icon${i}`);
        //If a prior icon exists, remove it
        if (iconEl.hasChildNodes()) {
            iconEl.removeChild(iconEl.firstChild);
        }

        const iconImg = document.createElement("img");
        iconImg.setAttribute("src", iconDisplay);
        // Append the icon image element to the icon element
        iconEl.appendChild(iconImg);


        // Pring out forecast Temp, wind, humidity
        var tempEl = document.getElementById(`f-temp${i}`);
        tempEl.innerHTML = "Temp: " + cityHistory[0].forecast[i].temp + '\u00B0F';

        var windEl = document.getElementById(`f-wind${i}`);
        windEl.innerHTML = "Wind: " + cityHistory[0].forecast[i].wind + " MPH";

        var humidityEl = document.getElementById(`f-humid${i}`);
        humidityEl.innerHTML = "Humidity: " + cityHistory[0].forecast[i].humidity + "%";
        // } //END OF FOR LOOP
    } //END OF FOR LOOP
}//END OF PRINT RESULTS

////////////////////
// getLatLong
//
//Call Open Weather with a City and get the lat and long coordinates
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function getLatLong(city) {

    //  user selects new city, Check if city is already in local storage (city, data) from prev search
    // If local storage exits 
    //       DisplayCity = data[]
    // Else
    //       call API to pull data because this is a new city
    //        displayCitySubmit = API source
    //        display all the following and store it in local storage  (city, values.  Ie.

    var prevCity = JSON.parse(localStorage.getItem(city));
    if (prevCity != null) {
        cityHistory = prevCity;
        printResults;
    } else { // entered City not in my stored history

        // Call OpenWeather to find city's latitude/longitude
        var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5' + '&appid=' + apiKey;
        //+ city + stateCode + '&limit=5' + 'apiKey';
        http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
        console.log("GeoCodeURL is", geoCodeUrl);
        fetch(geoCodeUrl)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {

                        // Data received! Display current conditions
                        extractWeather(city, data);
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to OpenWeather');
            });// end of FETCH
    } //END OF IF LOOP
} // END OF getLatLong

////////////////////
// getWeatherApi
// called by getLatLong
// Call OpenWeather API  and pass in the lat long from first city
function getWeatherApi(lat, long) {
    // console.log("Inside getWeatherApi fetching weather for lat-long of ", lat, long);
    // insert lat long into API
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var units = "imperial";
    var querySelectors = '&lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=' + units;
    var currWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?' + querySelectors;

    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?' + querySelectors;
    // console.log("Current Weather API URL is ", currWeatherApiUrl);
    // console.log("Forecast API URL is ", forecastApiUrl);

    fetch(currWeatherApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    console.log("CURRENT WEATHER conditions for Current City is", data);
                    // Display Icon by City and Date

                    // Display the current temperature for city
                    var outputTemp = '';
                    var city = data.name;
                    let cityTemp = data.main.temp;
                    let windSpeed = data.wind.speed;
                    let humidity = data.main.humidity;
                    let date = data.dt_text;
                    let icon = data.weather[0].icon;


                    //local storage
                    cityHistory[0].currTemp = data.main.temp;
                    cityHistory[0].currIcon = data.weather[0].icon;
                    cityHistory[0].currWind = data.wind.speed;
                    cityHistory[0].currHumidity = data.main.humidity;
                    console.log("cityHistory is ", cityHistory);

                    // outputTemp += '<span>' + cityTemp + '</span>';
                    // console.log("Date: ", date, "City: ", city, " curr temp: ", cityTemp, " curr wind : ", windspeed, " curr humidity:", humidity);

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

                    temperatureEL.innerHTML = "Temp: " + cityTemp + '\u00B0F';
                    windSpeedEL.innerHTML = "Wind: " + windSpeed + " MPH";
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
                    console.log("INSIDE FORECAST API CALL:  Forecasted data is : ", data);
                    for (let i = 3; i < data.list.length; i += 8) {
                        // the forecast data is for every 24 hours in 3 hour increments
                        // grab the 4th data point out of the 8 to get temperature at 3PM
                        let forecastTemp = data.list[i].main.temp;
                        let date = data.list[i].dt_txt;
                        if (i = 3) {
                            cityHistory[0].forecast[0].date = data.list[i].dt_txt;
                            cityHistory[0].forecast[0].icon = data.list[i].weather[0].icon;
                            cityHistory[0].forecast[0].temp = data.list[i].main.temp;
                            cityHistory[0].forecast[0].wind = data.list[i].wind.speed;
                            cityHistory[0].forecast[0].humidity = data.list[i].main.humidity;

                        }
                        if (i = 11) {
                            cityHistory[0].forecast[1].date = data.list[i].dt_txt;
                            cityHistory[0].forecast[1].icon = data.list[i].weather[0].icon;
                            cityHistory[0].forecast[1].temp = data.list[i].main.temp;
                            cityHistory[0].forecast[1].wind = data.list[i].wind.speed;;
                            cityHistory[0].forecast[1].humidity = data.list[i].main.humidity;
                        }
                        if (i = 19) {
                            cityHistory[0].forecast[2].date = data.list[i].dt_txt;
                            cityHistory[0].forecast[2].icon = data.list[i].weather[0].icon;
                            cityHistory[0].forecast[2].temp = data.list[i].main.temp;
                            cityHistory[0].forecast[2].wind = data.list[i].wind.speed;;
                            cityHistory[0].forecast[2].humidity = data.list[i].main.humidity;
                        }
                        if (i = 27) {
                            cityHistory[0].forecast[3].date = data.list[i].dt_txt;
                            cityHistory[0].forecast[3].icon = data.list[i].weather[0].icon;
                            cityHistory[0].forecast[3].temp = data.list[i].main.temp;
                            cityHistory[0].forecast[3].wind = data.list[i].wind.speed;;
                            cityHistory[0].forecast[3].humidity = data.list[i].main.humidity;
                        }
                        if (i = 35) {
                            cityHistory[0].forecast[4].date = data.list[i].dt_txt;
                            cityHistory[0].forecast[4].icon = data.list[i].weather[0].icon;
                            cityHistory[0].forecast[4].temp = data.list[i].main.temp;
                            cityHistory[0].forecast[4].wind = data.list[i].wind.speed;;
                            cityHistory[0].forecast[4].humidity = data.list[i].main.humidity;
                        }
                        printResults();
                        console.log ("City for local storage is", cityHistory.city);
                        console.log ("CityHistory is :", cityHistory);
                        // Save city data to local storage, create button
                        localStorage.setItem(cityHistory[0].city, JSON.stringify(cityHistory[0]));

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




var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityToSearch = userCityEl.value.trim();
    console.log("City to search for is: ", cityToSearch);
    // Retreive latitude and longitude of User City
    getLatLong(cityToSearch);
}
// Get user input for a City
formUserEl.addEventListener('submit', formSubmitHandler);

