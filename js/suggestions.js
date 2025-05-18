// Suggestions and recommendations functionality for the Travel Planner

// DOM Elements
const recommendationsContainer = document.getElementById("recommendations")

// Load recommendations
function loadRecommendations() {
  // In a real app, you would fetch recommendations from an API
  // For this example, we'll use hardcoded data
  const recommendations = [
    {
      destination: "Paris, France",
      image: "/placeholder.svg?height=180&width=300",
      description: "Experience the romance and culture of the City of Light",
      price: "$1,200",
    },
    {
      destination: "Tokyo, Japan",
      image: "/placeholder.svg?height=180&width=300",
      description: "Explore the perfect blend of tradition and innovation",
      price: "$1,800",
    },
    {
      destination: "Bali, Indonesia",
      image: "/placeholder.svg?height=180&width=300",
      description: "Relax on beautiful beaches and experience unique culture",
      price: "$950",
    },
    {
      destination: "New York, USA",
      image: "/placeholder.svg?height=180&width=300",
      description: "Discover the energy of the city that never sleeps",
      price: "$1,100",
    },
  ]

  // Clear existing recommendations
  recommendationsContainer.innerHTML = ""

  // Add recommendations to container
  recommendations.forEach((rec) => {
    const card = document.createElement("div")
    card.className = "suggestion-card"

    card.innerHTML = `
      <div class="suggestion-image" style="background-image: url('${rec.image}')"></div>
      <div class="suggestion-content">
        <h3>${rec.destination}</h3>
        <p>${rec.description}</p>
        <div class="suggestion-price">${rec.price}</div>
        <button class="btn btn-secondary suggestion-btn">View Details</button>
      </div>
    `

    // Add event listener to button
    card.querySelector(".suggestion-btn").addEventListener("click", () => {
      // Fill in the trip form with this destination
      document.getElementById("destination").value = rec.destination

      // Update map
      // Assuming updateMapLocation is defined elsewhere or imported
      if (typeof updateMapLocation === "function") {
        updateMapLocation(rec.destination)
      } else {
        console.warn("updateMapLocation function is not defined.")
      }

      // Scroll to trip planner
      document.querySelector(".trip-planner").scrollIntoView({ behavior: "smooth" })
    })

    recommendationsContainer.appendChild(card)
  })
}

// Get real-time suggestions based on user preferences
function getRealTimeSuggestions(destination, startDate, endDate, interests) {
  // In a real app, you would fetch data from weather API, events API, etc.
  // For this example, we'll simulate this with hardcoded data

  // Get weather forecast
  const weather = getWeatherForecast(destination, startDate, endDate)

  // Get local events
  const events = getLocalEvents(destination, startDate, endDate)

  // Get recommendations based on interests
  const recommendations = getRecommendationsBasedOnInterests(destination, interests)

  // Return combined suggestions
  return {
    weather,
    events,
    recommendations,
  }
}

// Get weather forecast (in a real app, use a weather API)
function getWeatherForecast(destination, startDate, endDate) {
  const weatherMap = {
    "Paris, France": {
      spring: { temp: "15°C", condition: "Partly Cloudy" },
      summer: { temp: "25°C", condition: "Sunny" },
      fall: { temp: "17°C", condition: "Rainy" },
      winter: { temp: "5°C", condition: "Cloudy" },
    },
    "Tokyo, Japan": {
      spring: { temp: "18°C", condition: "Cherry Blossoms" },
      summer: { temp: "30°C", condition: "Humid" },
      fall: { temp: "20°C", condition: "Clear" },
      winter: { temp: "8°C", condition: "Cold" },
    },
    // Add more destinations as needed
  }

  // Determine season based on start date
  const month = new Date(startDate).getMonth()
  let season

  if (month >= 2 && month <= 4) season = "spring"
  else if (month >= 5 && month <= 7) season = "summer"
  else if (month >= 8 && month <= 10) season = "fall"
  else season = "winter"

  // Return weather for destination and season
  return weatherMap[destination]?.[season] || { temp: "20°C", condition: "Varied" }
}

// Get local events (in a real app, use an events API)
function getLocalEvents(destination, startDate, endDate) {
  const eventsMap = {
    "Paris, France": [
      { name: "Art Exhibition at the Louvre", date: "2025-06-15" },
      { name: "Jazz Festival", date: "2025-07-10" },
      { name: "Bastille Day Celebrations", date: "2025-07-14" },
    ],
    "Tokyo, Japan": [
      { name: "Cherry Blossom Festival", date: "2025-04-05" },
      { name: "Sumida River Fireworks", date: "2025-07-28" },
      { name: "Tokyo Game Show", date: "2025-09-20" },
    ],
    // Add more destinations as needed
  }

  // Return events for destination
  return eventsMap[destination] || []
}

// Get recommendations based on interests
function getRecommendationsBasedOnInterests(destination, interests) {
  const recommendationsMap = {
    nature: {
      "Paris, France": ["Luxembourg Gardens", "Bois de Boulogne", "Jardin des Tuileries"],
      "Tokyo, Japan": ["Shinjuku Gyoen", "Ueno Park", "Meiji Shrine Gardens"],
    },
    culture: {
      "Paris, France": ["Louvre Museum", "Musée d'Orsay", "Centre Pompidou"],
      "Tokyo, Japan": ["Tokyo National Museum", "Edo-Tokyo Museum", "Ghibli Museum"],
    },
    food: {
      "Paris, France": ["Le Marais Food Tour", "Cooking Class", "Wine Tasting"],
      "Tokyo, Japan": ["Tsukiji Market Tour", "Sushi Making Class", "Izakaya Hopping"],
    },
    adventure: {
      "Paris, France": ["Seine River Kayaking", "Bike Tour", "Hot Air Balloon Ride"],
      "Tokyo, Japan": ["Mount Takao Hiking", "Tokyo Bay Cruise", "Robot Restaurant"],
    },
    relaxation: {
      "Paris, France": ["Spa Day", "Seine River Cruise", "Picnic at Champ de Mars"],
      "Tokyo, Japan": ["Onsen Experience", "Tea Ceremony", "Massage in Roppongi"],
    },
  }

  // Collect recommendations based on selected interests
  let recommendations = []

  interests.forEach((interest) => {
    const interestRecs = recommendationsMap[interest]?.[destination] || []
    recommendations = [...recommendations, ...interestRecs]
  })

  // Return unique recommendations
  return [...new Set(recommendations)]
}
