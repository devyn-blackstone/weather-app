var API = '0c334d4c8c4d7baf015516ca52670064';
var stateName;
var search = document.getElementById("search");

// get the API info and console log data
function getAPI(queryURL) {
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCurrentWeather(data)
        })
}

// when you click the search city button, register the city entered and run the get API function
search.addEventListener('click', function(e){
        e.preventDefault();
    var cityName = document.getElementById("cityname").value;
    if(cityName.length === 0){
        return;
    }
    else{
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + API + "&units=imperial";
        getAPI(queryURL);
    }
})

// need to display city, date, temp, wind, humidity, and UV index

function displayCurrentWeather(data){
    var oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API}&units=imperial`
    fetch(oneCallAPI)
        .then(response => response.json())
        .then (fiveDayData => {
            console.log(fiveDayData);
            var currentWeatherDiv = document.getElementById("currentWeather");
            currentWeatherDiv.innerHTML = `     
            <h1>${data.name} ${moment(data.dt, "X").format("MM/DD/YYYY")}<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            </img></h1> 
            <p>Temp:${data.main.temp} &deg;</p>
            <p>Wind:${data.wind.speed} MPH</p>
            <p>Humidity:${data.main.humidity} %</p>
            <p>UV Index:${fiveDayData.current.uvi}</p>`
        })
}

function displayFiveDayForecast(data){
    var fiveDayForecast = document.getElementById("fiveDayForecast");
    fiveDayForecast.innerHTML = `
    <h2>${moment(data.daily[1].dt, "X").format("MM/DD/YYYY")}</h2>
    <p><img src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png"</p>
    <p>Temp: &deg;</p>
    <p>Wind: MPH</p>
    <p>Humidity: %</p>`
}
