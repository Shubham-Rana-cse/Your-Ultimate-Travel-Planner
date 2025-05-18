// Trip Planner functionality
document.addEventListener("DOMContentLoaded", () => {
  // Tab navigation
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const saveBtn = document.getElementById("save-btn")
  const shareBtn = document.getElementById("share-btn")

  let currentTabIndex = 0

  // Function to show a specific tab
  function showTab(index) {
    // Hide all tabs
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabPanes.forEach((pane) => pane.classList.remove("active"))

    // Show the selected tab
    tabButtons[index].classList.add("active")
    tabPanes[index].classList.add("active")

    // Update navigation buttons
    prevBtn.disabled = index === 0

    if (index === tabButtons.length - 1) {
      nextBtn.style.display = "none"
      saveBtn.style.display = "inline-block"
      shareBtn.style.display = "inline-block"
    } else {
      nextBtn.style.display = "inline-block"
      saveBtn.style.display = "none"
      shareBtn.style.display = "none"
    }

    currentTabIndex = index
  }

  // Tab button click event
  tabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      showTab(index)
    })
  })

  // Previous button click event
  prevBtn.addEventListener("click", () => {
    if (currentTabIndex > 0) {
      showTab(currentTabIndex - 1)
    }
  })

  // Next button click event
  nextBtn.addEventListener("click", () => {
    if (currentTabIndex < tabButtons.length - 1) {
      showTab(currentTabIndex + 1)
    }
  })

  // Save button click event
  saveBtn.addEventListener("click", () => {
    alert("Your itinerary has been saved!")
  })

  // Share button click event
  shareBtn.addEventListener("click", () => {
    alert("Share functionality will be implemented soon!")
  })

  // Destinations tab functionality
  const destinationSearch = document.getElementById("destination-search")
  const selectedDestinations = document.getElementById("selected-destinations")
  const destinationOptions = document.querySelectorAll(".destination-option")

  // Destination search autocomplete
  const indianDestinations = [
    "Delhi, India",
    "Mumbai, India",
    "Kolkata, India",
    "Chennai, India",
    "Bangalore, India",
    "Hyderabad, India",
    "Ahmedabad, India",
    "Pune, India",
    "Jaipur, India",
    "Lucknow, India",
    "Agra, India",
    "Varanasi, India",
    "Udaipur, India",
    "Jaisalmer, India",
    "Darjeeling, India",
    "Shimla, India",
    "Manali, India",
    "Goa, India",
    "Kochi, India",
    "Rishikesh, India",
    "Amritsar, India",
    "Mysore, India",
    "Pondicherry, India",
    "Ooty, India",
    "Munnar, India",
    "Leh, India",
    "Srinagar, India",
    "Pushkar, India",
    "Hampi, India",
    "Khajuraho, India",
    "Ajanta and Ellora Caves, India",
    "Ranthambore, India",
    "Andaman Islands, India",
    "Lakshadweep Islands, India",
    "Dehradun, India",
  ]

  // Create autocomplete dropdown
  const autocompleteContainer = document.createElement("div")
  autocompleteContainer.className = "autocomplete-container"
  autocompleteContainer.style.display = "none"
  destinationSearch.parentNode.appendChild(autocompleteContainer)

  // Destination search input event
  destinationSearch.addEventListener("input", () => {
    const value = destinationSearch.value.toLowerCase()

    if (value.length < 2) {
      autocompleteContainer.innerHTML = ""
      autocompleteContainer.style.display = "none"
      return
    }

    // Filter destinations
    const matches = indianDestinations.filter((dest) => dest.toLowerCase().includes(value))

    // Update autocomplete container
    if (matches.length > 0) {
      autocompleteContainer.innerHTML = ""
      matches.forEach((match) => {
        const item = document.createElement("div")
        item.className = "autocomplete-item"
        item.textContent = match
        item.addEventListener("click", () => {
          addDestination(match)
          destinationSearch.value = ""
          autocompleteContainer.style.display = "none"
        })
        autocompleteContainer.appendChild(item)
      })
      autocompleteContainer.style.display = "block"
    } else {
      autocompleteContainer.style.display = "none"
    }
  })

  // Hide autocomplete when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target !== destinationSearch) {
      autocompleteContainer.style.display = "none"
    }
  })

  // Destination option click event
  destinationOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const destination = option.getAttribute("data-destination")
      addDestination(destination)
    })
  })

  // Function to add a destination
  function addDestination(destination) {
    // Check if destination already exists
    const existingDestinations = Array.from(selectedDestinations.querySelectorAll(".selected-destination-name")).map(
      (el) => el.textContent,
    )

    if (existingDestinations.includes(destination)) {
      return
    }

    // Create destination element
    const destinationEl = document.createElement("div")
    destinationEl.className = "selected-destination"

    destinationEl.innerHTML = `
      <span class="selected-destination-name">${destination}</span>
      <button class="remove-destination" title="Remove destination">
        <i class="fas fa-times"></i>
      </button>
    `

    // Add remove button event
    destinationEl.querySelector(".remove-destination").addEventListener("click", () => {
      destinationEl.remove()
    })

    // Add to selected destinations
    selectedDestinations.appendChild(destinationEl)
  }

  // Dates tab functionality
  const datePicker = document.getElementById("date-picker")
  const startDateEl = document.getElementById("start-date")
  const endDateEl = document.getElementById("end-date")
  const tripDurationEl = document.getElementById("trip-duration")
  const weatherForecastContainer = document.getElementById("weather-forecast-container")

  // Initialize flatpickr date picker
  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 12) // Allow booking up to 1 year in advance

  const fp = flatpickr(datePicker, {
    mode: "range",
    minDate: "today",
    maxDate: maxDate,
    dateFormat: "Y-m-d",
    onChange: (selectedDates, dateStr) => {
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0]
        const endDate = selectedDates[1]

        // Format dates for display (e.g., May 23rd, 2025)
        const formatDisplay = (date) => {
          const month = date.toLocaleString("en-US", { month: "long" })
          const day = getOrdinal(date.getDate())
          const year = date.getFullYear()
          return `${month} ${day}, ${year}`
        }

        startDateEl.textContent = formatDisplay(startDate)
        endDateEl.textContent = formatDisplay(endDate)

        // Calculate trip duration (inclusive)
        const durationDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
        tripDurationEl.textContent = `${durationDays} day${durationDays !== 1 ? "s" : ""}`

        // Update weather forecast
        updateWeatherForecast(startDate, endDate)
      }
    },
  })

  // Function to update weather forecast
  function updateWeatherForecast(startDate, endDate) {
    // Get selected destinations
    const destinations = Array.from(selectedDestinations.querySelectorAll(".selected-destination-name")).map(
      (el) => el.textContent,
    )

    if (destinations.length === 0) {
      weatherForecastContainer.innerHTML = `
        <p class="weather-note">Please select at least one destination to see weather forecasts.</p>
      `
      return
    }

    // Clear container
    weatherForecastContainer.innerHTML = ""

    // For each destination, show weather forecast
    destinations.forEach((destination) => {
      const destinationName = destination.split(",")[0] // Remove country part

      // Create forecast element
      const forecastEl = document.createElement("div")
      forecastEl.className = "destination-forecast"

      // In a real app, you would fetch actual forecast data
      // For demo purposes, we'll use mock data
      const forecast = getMockWeatherForecast(destinationName, startDate, endDate)

      forecastEl.innerHTML = `
        <h4>${destinationName}</h4>
        <div class="forecast-temps">
          <span><i class="fas fa-temperature-high"></i> High: ${forecast.high}°C</span>
          <span><i class="fas fa-temperature-low"></i> Low: ${forecast.low}°C</span>
        </div>
        <p class="forecast-condition"><i class="${forecast.icon}"></i> ${forecast.condition}</p>
      `

      weatherForecastContainer.appendChild(forecastEl)
    })
  }

  // Mock function to get weather forecast
  function getMockWeatherForecast(destination, startDate, endDate) {
    // Mock data based on destination and season
    const month = startDate.getMonth()
    let season

    // Determine season (simplified for India)
    if (month >= 2 && month <= 5) {
      season = "summer" // March to June
    } else if (month >= 6 && month <= 8) {
      season = "monsoon" // July to September
    } else if (month >= 9 && month <= 10) {
      season = "autumn" // October to November
    } else {
      season = "winter" // December to February
    }

    // Weather data by destination and season
    const weatherData = {
      Delhi: {
        summer: { high: 40, low: 28, condition: "Hot and dry", icon: "fas fa-sun" },
        monsoon: { high: 35, low: 26, condition: "Humid with occasional rain", icon: "fas fa-cloud-rain" },
        autumn: { high: 30, low: 18, condition: "Pleasant", icon: "fas fa-cloud-sun" },
        winter: { high: 20, low: 8, condition: "Cool and foggy", icon: "fas fa-smog" },
      },
      Mumbai: {
        summer: { high: 33, low: 27, condition: "Hot and humid", icon: "fas fa-sun" },
        monsoon: { high: 30, low: 25, condition: "Heavy rainfall", icon: "fas fa-cloud-showers-heavy" },
        autumn: { high: 32, low: 24, condition: "Warm and humid", icon: "fas fa-cloud-sun" },
        winter: { high: 30, low: 18, condition: "Pleasant", icon: "fas fa-sun" },
      },
      Jaipur: {
        summer: { high: 42, low: 28, condition: "Very hot and dry", icon: "fas fa-sun" },
        monsoon: { high: 35, low: 26, condition: "Warm with moderate rain", icon: "fas fa-cloud-rain" },
        autumn: { high: 32, low: 18, condition: "Pleasant", icon: "fas fa-cloud-sun" },
        winter: { high: 22, low: 8, condition: "Cool and dry", icon: "fas fa-sun" },
      },
      Goa: {
        summer: { high: 33, low: 26, condition: "Hot and humid", icon: "fas fa-sun" },
        monsoon: { high: 29, low: 24, condition: "Heavy rainfall", icon: "fas fa-cloud-showers-heavy" },
        autumn: { high: 32, low: 23, condition: "Warm and pleasant", icon: "fas fa-cloud-sun" },
        winter: { high: 31, low: 20, condition: "Pleasant and sunny", icon: "fas fa-sun" },
      },
    }

    // Default weather if destination not found
    const defaultWeather = {
      summer: { high: 35, low: 25, condition: "Hot", icon: "fas fa-sun" },
      monsoon: { high: 30, low: 24, condition: "Rainy", icon: "fas fa-cloud-rain" },
      autumn: { high: 28, low: 18, condition: "Pleasant", icon: "fas fa-cloud-sun" },
      winter: { high: 25, low: 12, condition: "Cool", icon: "fas fa-cloud" },
    }

    return (weatherData[destination] || defaultWeather)[season]
  }

  // Travelers tab functionality
  const numberInputs = document.querySelectorAll(".number-input")

  numberInputs.forEach((container) => {
    const input = container.querySelector("input")
    const decrementBtn = container.querySelector(".number-decrement")
    const incrementBtn = container.querySelector(".number-increment")

    decrementBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(input.value)
      const minValue = Number.parseInt(input.min)
      if (currentValue > minValue) {
        input.value = currentValue - 1
      }
    })

    incrementBtn.addEventListener("click", () => {
      const currentValue = Number.parseInt(input.value)
      input.value = currentValue + 1
    })
  })

  // Itinerary tab functionality
  const toggleMapBtn = document.getElementById("toggle-map")
  const mapContainer = document.getElementById("map-container")
  const itineraryTabBtns = document.querySelectorAll(".itinerary-tab-btn")
  const itineraryDayContents = document.querySelectorAll(".itinerary-day-content")
  const transportBtns = document.querySelectorAll(".transport-btn")
  const currencyBtns = document.querySelectorAll(".currency-btn")

  // Toggle map visibility
  toggleMapBtn.addEventListener("click", () => {
    const isVisible = mapContainer.style.display !== "none"

    if (isVisible) {
      mapContainer.style.display = "none"
      toggleMapBtn.innerHTML = '<i class="fas fa-map-marked-alt"></i> Show Map'
    } else {
      mapContainer.style.display = "block"
      // Ensure map container has a height
      const mapDiv = document.getElementById("map")
      if (mapDiv && !mapDiv.style.height) {
        mapDiv.style.height = "400px"
      }
      toggleMapBtn.innerHTML = '<i class="fas fa-times"></i> Hide Map'

      // Initialize map if not already initialized
      if (!window.itineraryMap) {
        initMap()
      } else {
        // If map already exists, invalidate size so it renders correctly
        setTimeout(() => {
          window.itineraryMap.invalidateSize()
        }, 200)
      }
    }
  })

  // Initialize map
  function initMap() {
    // Ensure map container has a height
    const mapDiv = document.getElementById("map")
    if (mapDiv && !mapDiv.style.height) {
      mapDiv.style.height = "400px"
    }
    // Create map
    window.itineraryMap = L.map("map").setView([28.6139, 77.209], 13) // Delhi coordinates

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(window.itineraryMap)

    // Add markers for activities
    addActivityMarkers()
  }

  // Add markers for activities
  function addActivityMarkers() {
    // Sample coordinates for Delhi attractions
    const attractions = [
      { name: "Red Fort", lat: 28.6562, lon: 77.241 },
      { name: "India Gate", lat: 28.6129, lon: 77.2295 },
      { name: "Qutub Minar", lat: 28.5244, lon: 77.1855 },
      { name: "Jama Masjid", lat: 28.6507, lon: 77.2334 },
    ]

    // Add markers
    attractions.forEach((attraction) => {
      const marker = L.marker([attraction.lat, attraction.lon]).addTo(window.itineraryMap)
      marker.bindPopup(`<b>${attraction.name}</b>`)
    })
  }

  // Itinerary day tab navigation
  itineraryTabBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      itineraryTabBtns.forEach((b) => b.classList.remove("active"))
      itineraryDayContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      btn.classList.add("active")
      itineraryDayContents[index].classList.add("active")
    })
  })

  // Transport mode buttons
  transportBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      transportBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // In a real app, you would update the route on the map
      const mode = btn.getAttribute("data-mode")
      console.log(`Transport mode changed to: ${mode}`)
    })
  })

  // Currency toggle
  currencyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currencyBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const currency = btn.getAttribute("data-currency")
      updateCurrency(currency)
    })
  })

  // Update currency display
  function updateCurrency(currency) {
    const budgetTotal = document.querySelector(".budget-total span")
    const budgetItems = document.querySelectorAll(".budget-item-value")

    // Exchange rate (simplified)
    const exchangeRate = 0.012 // 1 INR = 0.012 USD

    if (currency === "USD") {
      // Convert INR to USD
      budgetTotal.textContent = `Total: $${Math.round(45000 * exchangeRate)}`

      budgetItems.forEach((item) => {
        const inrValue = Number.parseInt(item.textContent.replace(/[^\d]/g, ""))
        const usdValue = Math.round(inrValue * exchangeRate)
        item.textContent = `$${usdValue}`
      })
    } else {
      // Show in INR
      budgetTotal.textContent = "Total: ₹45,000"

      // Reset budget items to INR values
      const inrValues = [20000, 10000, 8000, 7000]
      budgetItems.forEach((item, index) => {
        item.textContent = `₹${inrValues[index].toLocaleString()}`
      })
    }
  }

  // Add activity button functionality
  const addActivityBtns = document.querySelectorAll(".add-activity-btn")

  addActivityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // In a real app, you would show a form to add a new activity
      alert("Add activity functionality will be implemented soon!")
    })
  })

  // Activity edit and delete buttons
  document.querySelectorAll(".activity-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("title")
      const activityItem = btn.closest(".activity-item")
      const activityName = activityItem.querySelector("h4").textContent

      if (action === "Edit") {
        // In a real app, you would show an edit form
        alert(`Edit ${activityName} functionality will be implemented soon!`)
      } else if (action === "Delete") {
        if (confirm(`Are you sure you want to delete "${activityName}" from your itinerary?`)) {
          activityItem.remove()
        }
      }
    })
  })

  // Helper for ordinal suffix
  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }
})