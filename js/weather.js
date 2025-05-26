// Weather API integration
document.addEventListener("DOMContentLoaded", () => {
  // Top Indian destinations to fetch weather for
  const destinations = [
    { name: "Delhi", lat: 28.6139, lon: 77.209 },
    { name: "Mumbai", lat: 19.076, lon: 72.8777 },
    { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
    { name: "Goa", lat: 15.2993, lon: 74.124 },
  ];

  // Function to fetch weather data
  async function fetchWeather() {
    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = ""; // Clear existing content

    try {
      for (const destination of destinations) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${destination.lat}&lon=${destination.lon}&units=metric&appid=YOUR_API_KEY`
        );
        
        if (!response.ok) throw new Error('Weather API request failed');
        
        const data = await response.json();
        const weatherCard = createWeatherCard(destination.name, data);
        weatherContainer.appendChild(weatherCard);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      weatherContainer.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <p>Unable to load weather data. Please try again later.</p>
        </div>
      `;
    }
  }

  // Function to create a weather card with real data
  function createWeatherCard(city, data) {
    const card = document.createElement("div");
    card.className = "weather-card";

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    card.innerHTML = `
      <div class="weather-card-header">
        <h3>${city}</h3>
      </div>
      <div class="weather-card-body">
        <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
        <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
        <div class="weather-desc">${data.weather[0].description}</div>
        <div class="weather-meta">
          <div class="weather-humidity">
            <i class="fas fa-tint"></i> ${data.main.humidity}%
          </div>
          <div class="weather-wind">
            <i class="fas fa-wind"></i> ${Math.round(data.wind.speed * 3.6)} km/h
          </div>
        </div>
      </div>
    `;

    return card;
  }

  // Fetch weather initially
  fetchWeather();

  // Update weather every 30 minutes
  setInterval(fetchWeather, 30 * 60 * 1000);
});