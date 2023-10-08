let now = new Date();

let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  "November",
  "December",
];

let date = now.getDate();
let days = weekDays[now.getDay()];
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

currentDate.innerHTML = `${days}, ${date}, ${month}, ${year}`;
currentTime.innerHTML = `Local Time: ${hours}:${minutes}`;

//Challange 2
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let userInfo = searchInput.value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = userInfo;
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let units = "metric";
  let updatedapiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInfo}&appid=${apiKey}&units=${units}`;
  axios.get(updatedapiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let cantigerad = document.querySelector("#temperature");
  cantigerad.innerHTML = `${temperature}°C`;

  let cityName = response.data.name;
  console.log(cityName);
  let name = document.querySelector("h1");
  name.innerHTML = cityName;

  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#current-humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#current-wind");
  wind.innerHTML = `Wind speed : ${response.data.wind.speed} mph`;
}

// Bounse Point

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  console.log(position);

  let apiUrlLongLat = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f3009e4852fa0a079dab291dabf020c4&units=metric`;

  axios.get(apiUrlLongLat).then(showTemperature);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);
