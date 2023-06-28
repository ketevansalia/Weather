'use strict';
import apiKey from './apiKey.js';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// const weatherInfo = function () {};

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const errorMessage = document.queryCommandIndeterm('.error');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector('.error-paragraph').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    var data = await response.json();
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

    if (data.weather[0].main === 'Clouds') {
      weatherIcon.src = '/img/icons/clouds.png';
    } else if (data.weather[0].main === 'Clear') {
      weatherIcon.src = '/img/icons/clear.png';
    } else if (data.weather[0].main === 'Rain') {
      weatherIcon.src = '/img/icons/rainy.png';
    } else if (data.weather[0].main === 'Drizzle') {
      weatherIcon.src = '/img/icons/drizzle.png';
    } else if (data.weather[0].main === 'Mist') {
      weatherIcon.src = '/img/icons/mist.png';
    }
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error-paragraph').style.display = 'none';
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkWeather(searchBox.value);
  }
});
