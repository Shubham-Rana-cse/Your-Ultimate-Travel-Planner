// Weather API integration
document.addEventListener("DOMContentLoaded", () => {
  // Top Indian destinations to fetch weather for
  const destinations = [
    { name: "Delhi", lat: 28.6139, lon: 77.209 },
    { name: "Mumbai", lat: 19.076, lon: 72.8777 },
    { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
    { name: "Goa", lat: 15.2993, lon: 74.124 },
  ]

  // Function to fetch weather data
  async function fetchWeather() {
    const weatherContainer = document.getElementById("weather-container")

    // Clear any existing content
    weatherContainer.innerHTML = ""

    try {
      // Fetch weather data for each destination
      for (const destination of destinations) {
        // Using OpenWeatherMap API
        const apiKey = "11139befe75d18e90749774e521c3eef" // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${destination.lat}&lon=${destination.lon}&units=metric&appid=${apiKey}`

        // For demo purposes, we'll use a mock response
        // In a real application, you would use:
        // const response = await fetch(url);
        // const data = await response.json();

        // Mock weather data for demonstration
        const data = await getMockWeatherData(destination.name)

        // Create weather card
        const weatherCard = createWeatherCard(destination.name, data)
        weatherContainer.appendChild(weatherCard)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
      weatherContainer.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <p>Unable to load weather data. Please try again later.</p>
        </div>
      `
    }
  }

  // Function to create a weather card
  function createWeatherCard(city, data) {
    const card = document.createElement("div")
    card.className = "weather-card"

    // Get weather icon
    const iconClass = getWeatherIconClass(data.weather[0].main)

    card.innerHTML = `
      <div class="weather-card-header">
        <h3>${city}</h3>
      </div>
      <div class="weather-card-body">
        <div class="weather-icon">
          <i class="${iconClass}"></i>
        </div>
        <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
        <div class="weather-desc">${data.weather[0].description}</div>
        <div class="weather-meta">
          <div class="weather-humidity">
            <i class="fas fa-tint"></i> ${data.main.humidity}%
          </div>
          <div class="weather-wind">
            <i class="fas fa-wind"></i> ${data.wind.speed} m/s
          </div>
        </div>
      </div>
    `

    return card
  }

  // Function to get appropriate weather icon class
  function getWeatherIconClass(weatherMain) {
    const iconMap = {
      Clear: "fas fa-sun",
      Clouds: "fas fa-cloud",
      Rain: "fas fa-cloud-rain",
      Drizzle: "fas fa-cloud-rain",
      Thunderstorm: "fas fa-bolt",
      Snow: "fas fa-snowflake",
      Mist: "fas fa-smog",
      Smoke: "fas fa-smog",
      Haze: "fas fa-smog",
      Dust: "fas fa-smog",
      Fog: "fas fa-smog",
      Sand: "fas fa-smog",
      Ash: "fas fa-smog",
      Squall: "fas fa-wind",
      Tornado: "fas fa-wind",
    }

    return iconMap[weatherMain] || "fas fa-cloud"
  }

  // Mock function to simulate API response
  async function getMockWeatherData(city) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock data based on city
    const mockData = {
      Delhi: {
        main: { temp: 32, humidity: 45 },
        weather: [{ main: "Clear", description: "clear sky" }],
        wind: { speed: 3.5 },
      },
      Mumbai: {
        main: { temp: 29, humidity: 80 },
        weather: [{ main: "Clouds", description: "scattered clouds" }],
        wind: { speed: 4.2 },
      },
      Jaipur: {
        main: { temp: 34, humidity: 30 },
        weather: [{ main: "Clear", description: "clear sky" }],
        wind: { speed: 2.8 },
      },
      Goa: {
        main: { temp: 27, humidity: 85 },
        weather: [{ main: "Rain", description: "light rain" }],
        wind: { speed: 5.1 },
      },
    }

    return (
      mockData[city] || {
        main: { temp: 30, humidity: 60 },
        weather: [{ main: "Clouds", description: "few clouds" }],
        wind: { speed: 3.0 },
      }
    )
  }

  // Fetch weather data when page loads
  fetchWeather()
})
