const formElement = document.getElementById("form");
const townInputElement = document.getElementById("townInput");
const weatherInfoElement = document.getElementById("weatherInfo");
const overlayElement = document.getElementById("overlay");
const cityNameElement = document.getElementById("cityName");
const temperatureElement = document.getElementById("temperature");
const feelsLikeElement = document.getElementById("feelsLike");
const weatherDescriptionElement = document.getElementById("weatherDescription");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("windSpeed");
const weatherIconElement = document.querySelector(".weather_icon");

formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const townInput = townInputElement.value.trim();
    fetchWeather(townInput);
});

function fetchWeather(city) {
    const apiKey = "fde0e96695b141e9821183351240512";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ru`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Ошибка:", error);
            weatherInfoElement.innerHTML = "Не удалось получить данные о погоде.";
            overlayElement.style.display = "flex";
        });
}

function displayWeather(data) {
    cityNameElement.textContent = `${data.location.name}, ${data.location.region}`;
    temperatureElement.textContent = data.current.temp_c;
    feelsLikeElement.textContent = data.current.feelslike_c;
    weatherDescriptionElement.textContent = data.current.condition.text;
    humidityElement.textContent = data.current.humidity;
    windSpeedElement.textContent = data.current.wind_kph;
    weatherIconElement.src = data.current.condition.icon;

    overlayElement.style.display = "flex";
}

overlayElement.addEventListener("click", function (e) {
    if (e.target === this) {
        this.style.display = "none";
    }
});
