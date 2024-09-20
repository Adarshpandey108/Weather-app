const apiKey = '40045ea21d304208afcf96b62b53629b'; 

// Theme Toggle
document.getElementById('theme-toggle-btn').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    this.textContent = themeIcon;
});

// Fetch weather on button click
document.getElementById('search-btn').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        displayError('Please enter a city.');
    }
});

// Fetch weather data from API
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Display fetched weather data
function displayWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('feels-like').textContent = data.main.feels_like; // Feels like temperature
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('pressure').textContent = data.main.pressure; // Pressure
    document.getElementById('visibility').textContent = data.visibility / 1000; // Visibility in kilometers
    document.getElementById('wind-speed').textContent = data.wind.speed;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Weather icon
    document.getElementById('error-message').textContent = ''; // Clear any previous errors
}

// Display error messages
function displayError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('city-name').textContent = '';
    document.getElementById('weather-description').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('feels-like').textContent = ''; // Clear "feels like" field
    document.getElementById('humidity').textContent = '';
    document.getElementById('pressure').textContent = ''; // Clear pressure field
    document.getElementById('visibility').textContent = ''; // Clear visibility field
    document.getElementById('wind-speed').textContent = '';
    document.getElementById('weather-icon').src = ''; // Clear weather icon
}
