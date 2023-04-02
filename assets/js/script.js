//personal OpenWeather API Key
var apiKey = "3d8bc7dbc26cedc603210d72caafa151";

// Query Selectors
var formUserEl = document.querySelector('#city');
var userCityEl = document.querySelector('#user-city');
var btnCitySearchEl = document.querySelector('.btn');
var weatherContainerEl = document.querySelector('#weather');
var forecastSubtitle = document.querySelector('#f1');
var initialDisplay = true;

// Weather object, holds current weather and 5-day forecast for a city
var cityData =
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

/////// Creates HTML elements to display the 5-day forecast
function createForecastHtml() {
    for (var i = 0; i < 5; i++) {
        // Loop to create the 5 cards in this format       Query Selectors
        //                                                 htmlForecast ==> #fiveDaysFforecast in HTML
        //<div class="col-12 col-md-2">                       cardEl
        //    <div class="card1 card-body">                      cardBody
        //       <div class="f-subtitle" id="f-date0">Date: </div>  dateElement
        //       <div id="f-icon0"></div>                           iconElement
        //       <div class="sub-data">                             subDataEl
        //          <div id="f-temp0">Temp: </div>                     tempElement
        //          <div id="f-wind0">Wind: </div>                     windElement
        //          <div id="f-humid0">Humidity: </div>                humidElement
        //        </div>
        //    </div>
        // </div>

        // Query selector for parent
        var htmlForecast = document.querySelector('#fiveDaysForecast');

        // This card element is appended to parent last
        // It is the main container
        var cardEl = document.createElement("div");

        cardEl.setAttribute("class", "col-12 col-md-2");
        // create card body
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card1 card-body");
        cardEl.appendChild(cardBody);
        // create date element & append
        var dateElement = document.createElement("div");
        dateElement.setAttribute("class", "f-subtitle");
        dateElement.setAttribute("id", "f-date" + i);
        cardBody.appendChild(dateElement);
        // create icon element & append
        var iconElement = document.createElement("div");
        iconElement.setAttribute("id", "f-icon" + i);
        cardBody.appendChild(iconElement);

        //Create sub-data DIV for temp, wind, humidity & append
        var subDataEl = document.createElement("div");
        subDataEl.setAttribute("class", "sub-data");
        cardBody.appendChild(subDataEl);

        // Create  temp element and add it to the sub-data container
        var tempElement = document.createElement("div");
        tempElement.setAttribute("id", "f-temp" + i);
        tempElement.textContent = "Temp: ";
        subDataEl.appendChild(tempElement);

        // Create the wind element and add it to the sub-data container
        var windElement = document.createElement("div");
        windElement.setAttribute("id", "f-wind" + i);
        windElement.textContent = "Wind: ";
        subDataEl.appendChild(windElement);

        // Create the humidity element and add it to the sub-data container
        var humidElement = document.createElement("div");
        humidElement.setAttribute("id", "f-humid" + i);
        humidElement.textContent = "Humidity: ";
        subDataEl.appendChild(humidElement);

        // Add the main container holding all HTML (card element) to the parent HTML
        htmlForecast.appendChild(cardEl);
    }; // ENDING of FOR loop
}// End of createForecastHtml

////// Display current weather for selectd city
function renderCurrWeather() {

    // Display the current city & Date
    let dateOutput = dayjs().format('M/D/YYYY');
    let cityOutput = cityData.city + ", " + cityData.state;
    var currrentCityEl = document.getElementById('cities');
    currrentCityEl.innerHTML = cityOutput + " (" + dateOutput + ")";

    // Display current temp, wind, humidity
    var temperatureEL = document.getElementById("temperature");
    var windSpeedEL = document.getElementById("windspeed");
    var humidityEL = document.getElementById("humidity");

    temperatureEL.innerHTML = "Temp: " + cityData.currTemp + '\u00B0F';
    windSpeedEL.innerHTML = "Wind: " + cityData.currWind + " MPH";
    humidityEL.innerHTML = "Humidity: " + cityData.currHumidity + "%";

    //Display icon
    var iconElement = document.getElementById("icon");

    //Clear previous icon if it exists in HTML
    var iconImgEl = iconElement.querySelector("img");
    if (iconElement.contains(iconImgEl)) {
        iconElement.removeChild(iconImgEl); //remove child from the img element
    }
    // get icon, append the image element to HTML
    let icon = cityData.currIcon;
    let iconDisplay = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    console.log("Icon is ", iconDisplay);
    const iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconDisplay);
    iconElement.appendChild(iconImg);
} // END renderCurrWeather


////// Render 5 day forecast for selectd city
function renderForecastWeather() {
    // output forecast data to 5 cards
    for (var i = 0; i < 5; i++) {

        // Add Date
        var dateEl = document.getElementById(`f-date${i}`);
        var date = cityData.forecast[i].date;
        var formatDate = dayjs(date).format('M/D/YYYY');
        dateEl.innerHTML = formatDate;

        // Add icon to display
        let iconString = cityData.forecast[i].icon;
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

        // Print forecast Temp, wind, humidity
        var tempEl = document.getElementById(`f-temp${i}`);
        tempEl.innerHTML = "Temp: " + cityData.forecast[i].temp + '\u00B0F';

        var windEl = document.getElementById(`f-wind${i}`);
        windEl.innerHTML = "Wind: " + cityData.forecast[i].wind + " MPH";

        var humidityEl = document.getElementById(`f-humid${i}`);
        humidityEl.innerHTML = "Humidity: " + cityData.forecast[i].humidity + "%";
    };
}//END renderForecastWeather


////// Two Calls to OpenWeather API, one for current weather, one for forecast weather, both passing in lat/long
function getWeatherApi(lat, long) {

    var units = "imperial";
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var querySelectors = '&lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=' + units;
    var currWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?' + querySelectors;

    // Get current weather from API
    fetch(currWeatherApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log("CURRENT WEATHER conditions for Current City is", data);
                    //store current temp, icon, wind, humidity to local array
                    cityData.currTemp = data.main.temp;
                    cityData.currIcon = data.weather[0].icon;
                    cityData.currWind = data.wind.speed;
                    cityData.currHumidity = data.main.humidity;
                    // console.log("cityData is ", cityData);
                    renderCurrWeather();
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });


    ////// Get forecast weather from API
    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?' + querySelectors;

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
                            cityData.forecast[0].date = data.list[i].dt_txt;
                            cityData.forecast[0].icon = data.list[i].weather[0].icon;
                            cityData.forecast[0].temp = data.list[i].main.temp;
                            cityData.forecast[0].wind = data.list[i].wind.speed;
                            cityData.forecast[0].humidity = data.list[i].main.humidity;

                        }
                        if (i = 11) {
                            cityData.forecast[1].date = data.list[i].dt_txt;
                            cityData.forecast[1].icon = data.list[i].weather[0].icon;
                            cityData.forecast[1].temp = data.list[i].main.temp;
                            cityData.forecast[1].wind = data.list[i].wind.speed;;
                            cityData.forecast[1].humidity = data.list[i].main.humidity;
                        }
                        if (i = 19) {
                            cityData.forecast[2].date = data.list[i].dt_txt;
                            cityData.forecast[2].icon = data.list[i].weather[0].icon;
                            cityData.forecast[2].temp = data.list[i].main.temp;
                            cityData.forecast[2].wind = data.list[i].wind.speed;;
                            cityData.forecast[2].humidity = data.list[i].main.humidity;
                        }
                        if (i = 27) {
                            cityData.forecast[3].date = data.list[i].dt_txt;
                            cityData.forecast[3].icon = data.list[i].weather[0].icon;
                            cityData.forecast[3].temp = data.list[i].main.temp;
                            cityData.forecast[3].wind = data.list[i].wind.speed;;
                            cityData.forecast[3].humidity = data.list[i].main.humidity;
                        }
                        if (i = 35) {
                            cityData.forecast[4].date = data.list[i].dt_txt;
                            cityData.forecast[4].icon = data.list[i].weather[0].icon;
                            cityData.forecast[4].temp = data.list[i].main.temp;
                            cityData.forecast[4].wind = data.list[i].wind.speed;;
                            cityData.forecast[4].humidity = data.list[i].main.humidity;
                        }
                        // Display forecast weather
                        renderForecastWeather();

                        // console.log("cityData is :", cityData);
                        // Save current weather and forecast weather to local storage, use KEY = city name
                        localStorage.setItem(cityData.city, JSON.stringify(cityData));

                        // Create a button for CITY
                        var prevCityEl = document.querySelector('.prev-cities');
                        var button = document.createElement("button");
                        button.setAttribute("class", "btn grey-btn");
                        button.setAttribute("type", "submit");
                        button.textContent = (cityData.city);
                        prevCityEl.appendChild(button);
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


/////// Call Open Weather, pass City Name and retreive the lat and long coordinates for city
function getLatLong(city) {

    var prevCity = JSON.parse(localStorage.getItem(city));
    if (prevCity != null) {
        // local storage exists, update page with saved data
        cityData = prevCity;
        renderCurrWeather();
        renderForecastWeather();
    } else { // user input is a new City

        // Call OpenWeather Direct geocoding, find city's latitude/longitude
        var geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5' + '&appid=' + apiKey;

        fetch(geoCodeUrl)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        //Log first 5 city's returned from Open Weather
                        // for (let i = 0; i < data.length; i++) {
                        //     lat = data[i].lat;
                        //     long = data[i].lon;
                        //     let shLat = lat.toFixed(2);
                        //     let shLong = long.toFixed(2);
                        //     let name = data[i].name;
                        //     let state = data[i].state;
                        //     let country = data[i].country;
                        //     console.log(name + ', ' + state + ', ' + country + ' Lat  ' + shLat + ' Long ' + shLong);
                        // }
                        console.log("Data is ", data);
                        if (data.length === 0) {
                            return;
                        }
                        // Store city, state, lat, long to local array
                        cityData.city = city;
                        if (data[0].state) {
                            cityData.state = data[0].state;
                        } else {
                            cityData.state = "";
                        }
                        let lat = cityData.lat = data[0].lat;
                        let long = cityData.long = data[0].lon;

                        // Get current weather with Lat Long above
                        getWeatherApi(lat, long);
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to OpenWeather');
            });// end of FETCH
    } //END of IF loop
} // END OF getLatLong


////// Event listener for previous city buttons, left column
var prevBtnCityEl = document.querySelector('.prev-cities')
prevBtnCityEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("PREV BUTTON CLICKED");
    // retreive city from button that was clicked. Use class for prev cities .grey-btn
    var cityChoice = event.target.closest('.grey-btn');
    var cityToLookup = cityChoice.innerHTML;
    console.log("User selected prior city: ", cityToLookup);
    var prevCity = JSON.parse(localStorage.getItem(cityToLookup));
    if (prevCity != null) {
        cityData = prevCity;
        renderCurrWeather();
        renderForecastWeather();
    }
});



////// Handle form input
var formSubmitHandler = function (event) {
    event.preventDefault();
    if (initialDisplay) {
        // make weather output visible & create HTML on page
        weatherContainerEl.setAttribute("class", "card card-body .visible");
        forecastSubtitle.setAttribute("class", "f-subtitle .visible")
        createForecastHtml();
    };
    initialDisplay = false;

    // Retreive city name
    var cityToSearch = userCityEl.value.trim();
    // lowercase all input except first character
    // slice(1) will extract a substring starting from the second character (index 1) to the end of the string.
    cityToSearch = cityToSearch.charAt(0).toUpperCase() + cityToSearch.slice(1).toLowerCase();
    console.log("City to search for is: ", cityToSearch);

    //Clear form input
    userCityEl.value = '';

    // Get latitude and longitude for City
    getLatLong(cityToSearch);
}



////// Event listener to get user input for a City
formUserEl.addEventListener('submit', formSubmitHandler);




