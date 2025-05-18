// Booking functionality for flights and hotels
document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const bookingTabs = document.querySelectorAll(".booking-tab")
  const bookingContents = document.querySelectorAll(".booking-content")

  bookingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and contents
      bookingTabs.forEach((t) => t.classList.remove("active"))
      bookingContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active")
      const tabId = tab.getAttribute("data-tab")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Set min date for date inputs to today
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Flight form date constraints
  const flightDepartInput = document.getElementById("flight-depart")
  const flightReturnInput = document.getElementById("flight-return")

  flightDepartInput.min = formatDate(today)
  flightDepartInput.value = formatDate(today)

  flightReturnInput.min = formatDate(tomorrow)
  flightReturnInput.value = formatDate(tomorrow)

  // Update return min date when departure date changes
  flightDepartInput.addEventListener("change", () => {
    const departDate = new Date(flightDepartInput.value)
    const nextDay = new Date(departDate)
    nextDay.setDate(departDate.getDate() + 1)

    flightReturnInput.min = formatDate(nextDay)

    // If current return date is before new departure date, update it
    if (new Date(flightReturnInput.value) <= departDate) {
      flightReturnInput.value = formatDate(nextDay)
    }
  })

  // Hotel form date constraints
  const hotelCheckinInput = document.getElementById("hotel-checkin")
  const hotelCheckoutInput = document.getElementById("hotel-checkout")

  hotelCheckinInput.min = formatDate(today)
  hotelCheckinInput.value = formatDate(today)

  hotelCheckoutInput.min = formatDate(tomorrow)
  hotelCheckoutInput.value = formatDate(tomorrow)

  // Update checkout min date when checkin date changes
  hotelCheckinInput.addEventListener("change", () => {
    const checkinDate = new Date(hotelCheckinInput.value)
    const nextDay = new Date(checkinDate)
    nextDay.setDate(checkinDate.getDate() + 1)

    hotelCheckoutInput.min = formatDate(nextDay)

    // If current checkout date is before new checkin date, update it
    if (new Date(hotelCheckoutInput.value) <= checkinDate) {
      hotelCheckoutInput.value = formatDate(nextDay)
    }
  })

  // Flight search form submission
  const flightSearchForm = document.getElementById("flight-search-form")
  flightSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const from = document.getElementById("flight-from").value
    const to = document.getElementById("flight-to").value
    const depart = document.getElementById("flight-depart").value
    const returnDate = document.getElementById("flight-return").value
    const passengers = document.getElementById("flight-passengers").value

    // In a real application, you would send this data to a backend API
    // For demo purposes, we'll just log it and show an alert
    console.log("Flight search:", { from, to, depart, returnDate, passengers })

    alert(
      `Searching for flights from ${from} to ${to} on ${depart}${returnDate ? ` with return on ${returnDate}` : ""} for ${passengers} passenger(s).`,
    )

    // Redirect to a results page (in a real application)
    // window.location.href = `flight-results.html?from=${from}&to=${to}&depart=${depart}&return=${returnDate}&passengers=${passengers}`;
  })

  // Hotel search form submission
  const hotelSearchForm = document.getElementById("hotel-search-form")
  hotelSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const destination = document.getElementById("hotel-destination").value
    const checkin = document.getElementById("hotel-checkin").value
    const checkout = document.getElementById("hotel-checkout").value
    const guests = document.getElementById("hotel-guests").value

    // In a real application, you would send this data to a backend API
    // For demo purposes, we'll just log it and show an alert
    console.log("Hotel search:", { destination, checkin, checkout, guests })

    alert(`Searching for hotels in ${destination} from ${checkin} to ${checkout} for ${guests} guest(s).`)

    // Redirect to a results page (in a real application)
    // window.location.href = `hotel-results.html?destination=${destination}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`;
  })

  // Populate popular Indian destinations for autocomplete
  const popularDestinations = [
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Agra",
    "Varanasi",
    "Udaipur",
    "Jaisalmer",
    "Darjeeling",
    "Shimla",
    "Manali",
    "Goa",
    "Kochi",
    "Rishikesh",
    "Amritsar",
    "Mysore",
    "Pondicherry",
    "Ooty",
    "Munnar",
  ]

  // Simple autocomplete for destination inputs
  function setupAutocomplete(inputId, destinations) {
    const input = document.getElementById(inputId)
    if (!input) return

    // Create autocomplete container
    const autocompleteContainer = document.createElement("div")
    autocompleteContainer.className = "autocomplete-container"
    autocompleteContainer.style.display = "none"
    input.parentNode.appendChild(autocompleteContainer)

    // Input event listener
    input.addEventListener("input", function () {
      const value = this.value.toLowerCase()

      // Clear and hide container if input is too short
      if (value.length < 2) {
        autocompleteContainer.innerHTML = ""
        autocompleteContainer.style.display = "none"
        return
      }

      // Filter destinations
      const matches = destinations.filter((dest) => dest.toLowerCase().includes(value))

      // Update autocomplete container
      if (matches.length > 0) {
        autocompleteContainer.innerHTML = ""
        matches.forEach((match) => {
          const item = document.createElement("div")
          item.className = "autocomplete-item"
          item.textContent = match
          item.addEventListener("click", () => {
            input.value = match
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
      if (e.target !== input) {
        autocompleteContainer.style.display = "none"
      }
    })
  }

  // Setup autocomplete for destination inputs
  setupAutocomplete("flight-from", popularDestinations)
  setupAutocomplete("flight-to", popularDestinations)
  setupAutocomplete("hotel-destination", popularDestinations)
})
