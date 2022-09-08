function showHour(timestamp) {
  let hour = new Date(timestamp);
  let hours = hour.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = hour.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function showDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dateDay = date.getDate();
  let year = date.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${day}, ${dateDay} ${month}, ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-day">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="45"
              />
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )} ºC</span>
                <span class="weather-forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )} ºC</span>
              </div>
            </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let cityName = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let currentHour = document.querySelector("#current-hour");
  let currentDate = document.querySelector("#current-date");
  let currentIcon = document.querySelector("#current-icon");

  temperatureCelsius = Math.round(response.data.main.temp);

  temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperatureCelsius}`;

  cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${cityName}`;

  descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;

  humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;

  windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;

  currentHour.innerHTML = showHour(response.data.dt * 1000);
  currentDate.innerHTML = showDate(response.data.dt * 1000);

  let iconCode = response.data.weather[0].icon;

  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "06443709fb4fa0784a47c70f5cd80b08";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function submitCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFarhValue(event) {
  event.preventDefault();
  let farhValue = Math.round((`${temperatureCelsius}` * 9) / 5 + 32);
  temperatureElement.innerHTML = `${farhValue}`;
  celsius.classList.remove("active");
  fahr.classList.add("active");
}

function showCelsiusValue(event) {
  event.preventDefault();
  temperatureElement.innerHTML = `${temperatureCelsius}`;
  fahr.classList.remove("active");
  celsius.classList.add("active");
}

let temperatureCelsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let fahr = document.querySelector("#farh");
fahr.addEventListener("click", showFarhValue);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusValue);

search("Porto");
