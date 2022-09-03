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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let currentHour = document.querySelector("#current-hour");
  let currentDate = document.querySelector("#current-date");
  let currentIcon = document.querySelector("#current-icon");

  temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}`;

  cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${city}`;

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
}
let cityApiUrl = "Porto";
let apiKey = "06443709fb4fa0784a47c70f5cd80b08";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityApiUrl}&appid=${apiKey}&units=metric`;

axios.get(`${apiUrl}`).then(showTemperature);
