let now = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let currentDay = document.querySelector("#today");

currentDay.innerHTML = day[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let mins = now.getMinutes();

if (mins < 10) {
  mins = `0${mins}`;
}

function showSearchTemp(response) {
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4476a70ae319a3fc20bd190324b9e336&units=metric`;
  axios.get(apiUrl).then(showSearchTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input-text").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "398fe4dd8e9bd9b709d1faae81fa1e4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let search = document.querySelector("#search");
search.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${mins}`;

searchCity("Auckland");
