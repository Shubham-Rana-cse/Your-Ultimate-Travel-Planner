// Itineraries page functionality
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const authCheckMessage = document.getElementById("auth-check-message")
  const loadingIndicator = document.getElementById("loading-indicator")
  const itinerariesList = document.getElementById("itineraries-list")
  const emptyState = document.getElementById("empty-state")

  // Check if user is logged in
  checkAuth()

  // Function to check authentication
  function checkAuth() {
    // In a real app, you would check if the user is logged in
    // For demo purposes, we'll simulate this
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (!isLoggedIn) {
      // Show auth check message
      loadingIndicator.style.display = "none"
      authCheckMessage.style.display = "flex"
      return
    }

    // User is logged in, load itineraries
    loadItineraries()
  }

  // Function to load itineraries
  function loadItineraries() {
    // Show loading indicator
    loadingIndicator.style.display = "flex"
    authCheckMessage.style.display = "none"

    // In a real app, you would fetch data from an API
    // For demo purposes, we'll use setTimeout to simulate loading
    setTimeout(() => {
      // Hide loading indicator
      loadingIndicator.style.display = "none"

      // Get itineraries (in a real app, this would come from an API)
      const itineraries = getItineraries()

      if (itineraries.length === 0) {
        // Show empty state
        emptyState.style.display = "flex"
        itinerariesList.style.display = "none"
      } else {
        // Show itineraries
        emptyState.style.display = "none"
        itinerariesList.style.display = "block"

        // Render itineraries
        renderItineraries(itineraries)
      }
    }, 1500)
  }

  // Function to get itineraries
  function getItineraries() {
    // In a real app, you would fetch this from an API
    // For demo purposes, we'll use hardcoded data
    return [
      {
        id: 1,
        title: "Golden Triangle Tour",
        startDate: "2025-06-15",
        endDate: "2025-06-22",
        destinations: ["Delhi", "Agra", "Jaipur"],
        travelers: 2,
        budget: 45000,
        status: "upcoming",
      },
      {
        id: 2,
        title: "Kerala Backwaters",
        startDate: "2025-08-10",
        endDate: "2025-08-17",
        destinations: ["Kochi", "Alleppey", "Munnar"],
        travelers: 4,
        budget: 60000,
        status: "draft",
      },
      {
        id: 3,
        title: "Himalayan Adventure",
        startDate: "2024-12-05",
        endDate: "2024-12-15",
        destinations: ["Shimla", "Manali", "Dharamshala"],
        travelers: 2,
        budget: 55000,
        status: "completed",
      },
    ]
  }

  // Function to render itineraries
  function renderItineraries(itineraries) {
    // Clear existing content
    itinerariesList.innerHTML = ""

    // Add each itinerary
    itineraries.forEach((itinerary) => {
      const card = document.createElement("div")
      card.className = "itinerary-card"

      // Format dates
      const startDate = new Date(itinerary.startDate)
      const endDate = new Date(itinerary.endDate)
      const formattedStartDate = startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      const formattedEndDate = endDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

      // Calculate duration
      const duration = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))

      // Status icon
      let statusIcon = ""
      if (itinerary.status === "upcoming") {
        statusIcon = '<i class="fas fa-calendar-alt"></i>'
      } else if (itinerary.status === "completed") {
        statusIcon = '<i class="fas fa-check-circle"></i>'
      } else {
        statusIcon = '<i class="fas fa-edit"></i>'
      }

      // Create destinations HTML
      const destinationsHTML = itinerary.destinations
        .map((dest) => `<div class="itinerary-destination"><i class="fas fa-map-marker-alt"></i> ${dest}</div>`)
        .join("")

      // Set card HTML
      card.innerHTML = `
        <div class="itinerary-header">
          <div class="itinerary-title">
            <h3>${itinerary.title}</h3>
            <div class="itinerary-meta">
              <span><i class="fas fa-calendar"></i> ${formattedStartDate} - ${formattedEndDate}</span>
              <span><i class="fas fa-users"></i> ${itinerary.travelers} travelers</span>
            </div>
          </div>
          <div class="itinerary-actions">
            <button class="itinerary-action-btn" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="itinerary-action-btn" title="Share"><i class="fas fa-share-alt"></i></button>
            <button class="itinerary-action-btn" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="itinerary-content">
          <div class="itinerary-destinations">
            ${destinationsHTML}
          </div>
          <div class="itinerary-summary">
            <h4>Trip Summary</h4>
            <div class="itinerary-summary-items">
              <div class="summary-item">
                <i class="fas fa-clock"></i>
                <span>${duration} days</span>
              </div>
              <div class="summary-item">
                <i class="fas fa-wallet"></i>
                <span>₹${itinerary.budget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="itinerary-footer">
          <div class="itinerary-status ${itinerary.status}">
            ${statusIcon} ${itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
          </div>
          <a href="planner.html?id=${itinerary.id}" class="btn btn-outline btn-sm">View Details</a>
        </div>
      `

      // Add event listeners
      const editBtn = card.querySelector('[title="Edit"]')
      const shareBtn = card.querySelector('[title="Share"]')
      const deleteBtn = card.querySelector('[title="Delete"]')

      editBtn.addEventListener("click", () => {
        window.location.href = `planner.html?id=${itinerary.id}&edit=true`
      })

      shareBtn.addEventListener("click", () => {
        alert(`Share functionality for "${itinerary.title}" will be implemented soon!`)
      })

      deleteBtn.addEventListener("click", () => {
        if (confirm(`Are you sure you want to delete "${itinerary.title}"?`)) {
          // In a real app, you would send a delete request to the API
          card.remove()

          // Check if there are any itineraries left
          if (itinerariesList.children.length === 0) {
            emptyState.style.display = "flex"
            itinerariesList.style.display = "none"
          }
        }
      })

      // Add card to list
      itinerariesList.appendChild(card)
    })
  }
})
