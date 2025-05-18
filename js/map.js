// Map functionality for the Travel Planner

// Map variables
let map
let marker
const defaultLocation = [48.8566, 2.3522] // Paris coordinates

// Initialize map
function initMap() {
  // Create map
  map = L.map("map").setView(defaultLocation, 13)

  // Add tile layer (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  // Add default marker
  marker = L.marker(defaultLocation).addTo(map)
  marker.bindPopup("Paris, France").openPopup()
}

// Update map location based on destination
function updateMapLocation(destination) {
  // In a real app, you would use a geocoding API to get coordinates
  // For this example, we'll use a simple lookup
  const coordinates = getCoordinatesForDestination(destination)

  if (coordinates) {
    // Update map view
    map.setView(coordinates, 13)

    // Update marker
    if (marker) {
      marker.setLatLng(coordinates)
      marker.bindPopup(destination).openPopup()
    } else {
      marker = L.marker(coordinates).addTo(map)
      marker.bindPopup(destination).openPopup()
    }
  }
}

// Simple lookup for coordinates (in a real app, use geocoding API)
function getCoordinatesForDestination(destination) {
  const destinationMap = {
    "Paris, France": [48.8566, 2.3522],
    "Tokyo, Japan": [35.6762, 139.6503],
    "New York, USA": [40.7128, -74.006],
    "Rome, Italy": [41.9028, 12.4964],
    "Barcelona, Spain": [41.3851, 2.1734],
    "London, UK": [51.5074, -0.1278],
    "Sydney, Australia": [-33.8688, 151.2093],
    "Cairo, Egypt": [30.0444, 31.2357],
    "Rio de Janeiro, Brazil": [-22.9068, -43.1729],
    "Bangkok, Thailand": [13.7563, 100.5018],
  }

  return destinationMap[destination] || defaultLocation
}

// Add attractions to map
function addAttractionsToMap(destination) {
  // In a real app, you would fetch attractions from an API
  // For this example, we'll use hardcoded data
  const attractions = getAttractionsForDestination(destination)

  attractions.forEach((attraction) => {
    const attractionMarker = L.marker(attraction.coordinates).addTo(map)
    attractionMarker.bindPopup(`
      <strong>${attraction.name}</strong><br>
      ${attraction.description}<br>
      <a href="#" class="add-to-itinerary" data-name="${attraction.name}">Add to Itinerary</a>
    `)
  })

  // Add event listeners to "Add to Itinerary" links
  setTimeout(() => {
    document.querySelectorAll(".add-to-itinerary").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const attractionName = link.getAttribute("data-name")
        addAttractionToItinerary(attractionName)
      })
    })
  }, 1000)
}

// Get attractions for destination (in a real app, use an API)
function getAttractionsForDestination(destination) {
  const attractionsMap = {
    "Paris, France": [
      {
        name: "Eiffel Tower",
        description: "Iconic iron tower with stunning views",
        coordinates: [48.8584, 2.2945],
      },
      {
        name: "Louvre Museum",
        description: "World-famous art museum",
        coordinates: [48.8606, 2.3376],
      },
      {
        name: "Notre-Dame Cathedral",
        description: "Medieval Catholic cathedral",
        coordinates: [48.853, 2.3499],
      },
    ],
    "Tokyo, Japan": [
      {
        name: "Tokyo Skytree",
        description: "Tallest tower in Japan",
        coordinates: [35.7101, 139.8107],
      },
      {
        name: "Senso-ji Temple",
        description: "Ancient Buddhist temple",
        coordinates: [35.7147, 139.7966],
      },
      {
        name: "Shibuya Crossing",
        description: "Famous pedestrian crossing",
        coordinates: [35.6595, 139.7004],
      },
    ],
    // Add more destinations as needed
  }

  return attractionsMap[destination] || []
}

// Initialize map when DOM is loaded
document.addEventListener("DOMContentLoaded", initMap)
