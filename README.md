# weather-dashboard

App for that allows a user to see the weather outlook for multiple cities. Given a city the current weather and 5 day forecast are displayed.

# Webpage
Link to Deployed Application;
https://tasshroll.github.io/weather-dashboard/

Link to GitHub repository:
https://github.com/tasshroll/weather-dashboard


# Screenshot
SCREENSHOTS of application
![Screenshot of application page.](Assets/img/daily-planner.png)

VIDEO of usage
![Video of application use](Assets/img/daily-planner-video.mp4)

## Description
The appication uses OpenWeather API ((https://openweathermap.org/forecast5) to retrieve weather data. Data is displayed and stored in 'localStorage'. When user selects a previously stored city, the app will retreive the data for display. The app runs in the browser and features dynamically updated HTML and CSS, powered by JavaScript.

## User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly


## Acceptance Criteria

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Other

- What was your motivation and what did you learn? 
Motivated to build an application that:
- event listeners
- 2 different API calls to Open Weather
- localStorage used with JSON parse and stringify
- dynamically created HTML for forecast cards
- use dayjs for current date

- What did you learn?
I learned about API calls and retreival of data. I made extensive use of dev tools to locate the data needed to display weather.

## Installation 
N/A

## Usage
Click the main Generate Password button and answer the prompts.

## Credits
N/A
Ask BCS

## License
Please refer to the LICENSE in the repo.

## Badges
N/A

## Features
N/A

## How to Contribute
N/A

## Tests
N/A