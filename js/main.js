// Main JavaScript file for the Travel Planner

// DOM Elements
const tripForm = document.getElementById("trip-form")
const destinationInput = document.getElementById("destination")
const destinationSuggestions = document.getElementById("destination-suggestions")
const startDateInput = document.getElementById("start-date")
const endDateInput = document.getElementById("end-date")
const budgetInput = document.getElementById("budget")
const budgetValue = document.getElementById("budget-value")
const loginBtn = document.getElementById("login-btn")
const loginModal = document.getElementById("login-modal")
const shareModal = document.getElementById("share-modal")
const closeButtons = document.querySelectorAll(".close")
const shareItineraryBtn = document.getElementById("share-itinerary")
const copyLinkBtn = document.getElementById("copy-link")
const shareUrlInput = document.getElementById("share-url")
const itinerarySection = document.getElementById("itinerary-section")

// Set minimum dates for date inputs
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

startDateInput.min = formatDate(today)
endDateInput.min = formatDate(tomorrow)

// Format date to YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Update budget value display
budgetInput.addEventListener("input", () => {
  budgetValue.textContent = `$${Number.parseInt(budgetInput.value).toLocaleString()}`
})

// Destination suggestions
const destinations = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "Rome, Italy",
  "Barcelona, Spain",
  "London, UK",
  "Sydney, Australia",
  "Cairo, Egypt",
  "Rio de Janeiro, Brazil",
  "Bangkok, Thailand",
]

// Dummy functions to resolve undeclared variable errors
function updateMapLocation(destination) {
  console.log(`Updating map to show ${destination}`)
}

function createItinerary(destination, startDate, endDate, travelers, budget, interests) {
  console.log(
    `Creating itinerary for ${destination} from ${startDate} to ${endDate} with budget $${budget} and interests: ${interests}`,
  )
}

function loadRecommendations() {
  console.log("Loading recommendations...")
}

destinationInput.addEventListener("input", () => {
  const value = destinationInput.value.toLowerCase()

  if (value.length < 2) {
    destinationSuggestions.innerHTML = ""
    destinationSuggestions.style.display = "none"
    return
  }

  const filteredDestinations = destinations.filter((dest) => dest.toLowerCase().includes(value))

  if (filteredDestinations.length > 0) {
    destinationSuggestions.innerHTML = ""
    filteredDestinations.forEach((dest) => {
      const div = document.createElement("div")
      div.className = "suggestion-item"
      div.textContent = dest
      div.addEventListener("click", () => {
        destinationInput.value = dest
        destinationSuggestions.innerHTML = ""
        destinationSuggestions.style.display = "none"

        // Update map to show selected destination
        updateMapLocation(dest)
      })
      destinationSuggestions.appendChild(div)
    })
    destinationSuggestions.style.display = "block"
  } else {
    destinationSuggestions.innerHTML = ""
    destinationSuggestions.style.display = "none"
  }
})

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (e.target !== destinationInput) {
    destinationSuggestions.style.display = "none"
  }
})

// Form submission
tripForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form values
  const destination = destinationInput.value
  const startDate = startDateInput.value
  const endDate = endDateInput.value
  const travelers = document.getElementById("travelers").value
  const budget = budgetInput.value

  // Get selected interests
  const interests = []
  document.querySelectorAll('input[name="interests"]:checked').forEach((checkbox) => {
    interests.push(checkbox.value)
  })

  // Validate form
  if (!destination || !startDate || !endDate) {
    alert("Please fill in all required fields")
    return
  }

  // Create trip plan
  createItinerary(destination, startDate, endDate, travelers, budget, interests)

  // Show itinerary section
  itinerarySection.classList.remove("hidden")

  // Scroll to itinerary section
  itinerarySection.scrollIntoView({ behavior: "smooth" })
})

// Modal functionality
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "block"
})

shareItineraryBtn.addEventListener("click", () => {
  shareModal.style.display = "block"

  // Generate a fake share URL
  const shareUrl = `https://travelbuddy.com/itinerary/${Math.random().toString(36).substring(2, 10)}`
  shareUrlInput.value = shareUrl
})

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loginModal.style.display = "none"
    shareModal.style.display = "none"
  })
})

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none"
  }
  if (e.target === shareModal) {
    shareModal.style.display = "none"
  }
})

// Copy share link
copyLinkBtn.addEventListener("click", () => {
  shareUrlInput.select()
  document.execCommand("copy")

  // Change button text temporarily
  const originalText = copyLinkBtn.textContent
  copyLinkBtn.textContent = "Copied!"
  setTimeout(() => {
    copyLinkBtn.textContent = originalText
  }, 2000)
})

// Share buttons functionality
document.querySelectorAll(".share-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const platform = button.getAttribute("data-platform")
    const url = shareUrlInput.value
    const text = "Check out my travel itinerary!"

    let shareUrl

    switch (platform) {
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  })
})

// Login form submission
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Simple validation
  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Simulate login
  alert(`Login successful! Welcome back, ${email}`)
  loginModal.style.display = "none"

  // Change login button to user info
  loginBtn.textContent = "My Account"
})

// Initialize the page
function init() {
  // Set default dates
  startDateInput.value = formatDate(today)

  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)
  endDateInput.value = formatDate(nextWeek)

  // Load recommendations
  loadRecommendations()
}

// Call init on page load
window.addEventListener("DOMContentLoaded", init)
