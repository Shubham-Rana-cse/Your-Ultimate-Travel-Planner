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

  // Function to fetch real-time flight prices
  async function fetchFlightPrices(from, to, date) {
    try {
      // Using a free flight price API (replace with your preferred API)
      const response = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=YOUR_API_KEY&dep_iata=${from}&arr_iata=${to}&date=${date}`
      );
      const data = await response.json();
      return data.data[0]?.price || null;
    } catch (error) {
      console.error("Error fetching flight prices:", error);
      return null;
    }
  }

  // Function to fetch real-time hotel prices
  async function fetchHotelPrices(city, checkin, checkout) {
    try {
      // Using a free hotel price API (replace with your preferred API)
      const response = await fetch(
        `https://hotels4.p.rapidapi.com/properties/list?destinationId=${city}&checkIn=${checkin}&checkOut=${checkout}`,
        {
          headers: {
            'X-RapidAPI-Key': 'YOUR_API_KEY',
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
          }
        }
      );
      const data = await response.json();
      return data.properties[0]?.price || null;
    } catch (error) {
      console.error("Error fetching hotel prices:", error);
      return null;
    }
  }

  // Flight search form submission
  const flightSearchForm = document.getElementById("flight-search-form");
  flightSearchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const from = document.getElementById("flight-from").value;
    const to = document.getElementById("flight-to").value;
    const depart = document.getElementById("flight-depart").value;
    const returnDate = document.getElementById("flight-return").value;
    const passengers = document.getElementById("flight-passengers").value;

    // Show loading state
    const submitBtn = flightSearchForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    submitBtn.disabled = true;

    try {
      const price = await fetchFlightPrices(from, to, depart);
      if (price) {
        alert(`Found flights starting from ₹${price * passengers}`);
      } else {
        alert("No flights found for the selected route and dates.");
      }
    } catch (error) {
      console.error("Error searching flights:", error);
      alert("Error searching flights. Please try again.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  // Hotel search form submission with real-time prices
  const hotelSearchForm = document.getElementById("hotel-search-form");
  hotelSearchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const destination = document.getElementById("hotel-destination").value;
    const checkin = document.getElementById("hotel-checkin").value;
    const checkout = document.getElementById("hotel-checkout").value;
    const guests = document.getElementById("hotel-guests").value;

    // Show loading state
    const submitBtn = hotelSearchForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    submitBtn.disabled = true;

    try {
      const price = await fetchHotelPrices(destination, checkin, checkout);
      if (price) {
        alert(`Found hotels starting from ₹${price * guests} per night`);
      } else {
        alert("No hotels found for the selected destination and dates.");
      }
    } catch (error) {
      console.error("Error searching hotels:", error);
      alert("Error searching hotels. Please try again.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

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