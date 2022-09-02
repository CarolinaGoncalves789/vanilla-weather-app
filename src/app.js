function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
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
}

let apiKey = "06443709fb4fa0784a47c70f5cd80b08";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(`${apiUrl}`).then(showTemperature);
