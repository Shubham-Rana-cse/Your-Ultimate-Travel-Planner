// Destination detail page functionality
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")
  const mapContainer = document.getElementById("map")

  // Get destination ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const destinationId = urlParams.get("id")

  // Load destination data
  loadDestinationData(destinationId)

  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab")

      // Update active tab button
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Show corresponding tab content
      tabContents.forEach((content) => content.classList.remove("active"))
      document.getElementById(`${tabName}-tab`).classList.add("active")
    })
  })

  // Initialize map
  initMap()

  // Function to load destination data
  function loadDestinationData(id) {
    // In a real app, you would fetch data from an API
    // For demo purposes, we'll use hardcoded data
    const destinations = {
      1: {
        name: "Delhi",
        country: "India",
        image: "images/delhi.png",
        rating: 4.7,
        description:
          "Delhi, India's capital territory, is a massive metropolitan area in the country's north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India, and the sprawling Jama Masjid mosque, whose courtyard accommodates 25,000 people. Nearby is Chandni Chowk, a vibrant bazaar filled with food carts, sweets shops and spice stalls.",
        bestTime: "October to March",
        temperature: "Summer: 25-45°C, Winter: 5-25°C",
        category: "city",
        season: "winter",
        popularFor: ["Red Fort", "India Gate", "Qutub Minar"],
        coordinates: [28.6139, 77.209],
      },
      2: {
        name: "Jaipur",
        country: "India",
        image: "images/jaipur.png",
        rating: 4.8,
        description:
          'Jaipur is the capital of India\'s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or "Pink City" for its trademark building color. At the center of its stately street grid stands the opulent, colonnaded City Palace complex. With gardens, courtyards and museums, part of it is still a royal residence.',
        bestTime: "October to March",
        temperature: "Summer: 25-45°C, Winter: 8-25°C",
        category: "cultural",
        season: "winter",
        popularFor: ["Hawa Mahal", "Amber Fort", "City Palace"],
        coordinates: [26.9124, 75.7873],
      },
      // Add more destinations as needed
    }

    // Get destination data
    const destination = destinations[id] || destinations["1"] // Default to Delhi if ID not found

    // Update page content
    document.getElementById("destination-name").textContent = destination.name
    document.getElementById("destination-country").textContent = destination.country
    document.getElementById("destination-rating").textContent = destination.rating
    document.getElementById("destination-long-description").textContent = destination.description
    document.getElementById("destination-best-time").textContent = destination.bestTime
    document.getElementById("destination-temperature").textContent = destination.temperature
    document.getElementById("destination-img").src = destination.image
    document.getElementById("destination-cta-name").textContent = destination.name
    document.getElementById("destination-category").textContent = destination.category
    document.getElementById("destination-season").textContent = destination.season

    // Update popular for badges
    const popularForContainer = document.getElementById("destination-popular-for")
    popularForContainer.innerHTML = ""

    destination.popularFor.forEach((item) => {
      const badge = document.createElement("div")
      badge.className = "info-badge secondary"
      badge.textContent = item
      popularForContainer.appendChild(badge)
    })

    // Update map
    if (window.destinationMap) {
      window.destinationMap.setView(destination.coordinates, 13)

      // Clear existing markers
      if (window.destinationMarker) {
        window.destinationMap.removeLayer(window.destinationMarker)
      }

      // Add marker
      window.destinationMarker = L.marker(destination.coordinates).addTo(window.destinationMap)
      window.destinationMarker.bindPopup(`<b>${destination.name}</b>`).openPopup()
    }
  }

  // Initialize map
  function initMap() {
    // Create map
    window.destinationMap = L.map("map").setView([28.6139, 77.209], 13) // Default to Delhi

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(window.destinationMap)

    // Add marker (will be updated in loadDestinationData)
    window.destinationMarker = L.marker([28.6139, 77.209]).addTo(window.destinationMap)
    window.destinationMarker.bindPopup("<b>Delhi</b>").openPopup()
  }
})
