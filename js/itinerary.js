// Itinerary functionality for the Travel Planner

// DOM Elements
const itineraryContainer = document.getElementById("itinerary-container")
const editItineraryBtn = document.getElementById("edit-itinerary")
const saveItineraryBtn = document.getElementById("save-itinerary")

// Create itinerary based on trip details
function createItinerary(destination, startDate, endDate, travelers, budget, interests) {
  // Clear existing itinerary
  itineraryContainer.innerHTML = ""

  // Calculate trip duration
  const start = new Date(startDate)
  const end = new Date(endDate)
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

  // Generate itinerary for each day
  for (let i = 0; i < duration; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    const dayElement = createDayElement(i + 1, currentDate, destination, interests)
    itineraryContainer.appendChild(dayElement)
  }

  // Add attractions to map
  addAttractionsToMap(destination)

  // Enable editing
  enableItineraryEditing()
}

// Create element for a single day in the itinerary
function createDayElement(dayNumber, date, destination, interests) {
  const dayDiv = document.createElement("div")
  dayDiv.className = "itinerary-day"

  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  dayDiv.innerHTML = `
    <h3>Day ${dayNumber}: ${dateString}</h3>
    <div class="itinerary-items">
      ${generateDayActivities(dayNumber, destination, interests)}
    </div>
  `

  return dayDiv
}

// Generate activities for a day based on destination and interests
function generateDayActivities(dayNumber, destination, interests) {
  // In a real app, you would use an API to get personalized recommendations
  // For this example, we'll use hardcoded data

  let activities = ""

  // Morning activity
  activities += `
    <div class="itinerary-item">
      <div class="itinerary-time">09:00</div>
      <div class="itinerary-content">
        <h4>${getMorningActivity(dayNumber, destination, interests)}</h4>
        <p>Start your day with this amazing experience</p>
      </div>
    </div>
  `

  // Lunch
  activities += `
    <div class="itinerary-item">
      <div class="itinerary-time">13:00</div>
      <div class="itinerary-content">
        <h4>Lunch at ${getLocalRestaurant(destination)}</h4>
        <p>Enjoy local cuisine at this popular restaurant</p>
      </div>
    </div>
  `

  // Afternoon activity
  activities += `
    <div class="itinerary-item">
      <div class="itinerary-time">15:00</div>
      <div class="itinerary-content">
        <h4>${getAfternoonActivity(dayNumber, destination, interests)}</h4>
        <p>Continue your adventure with this exciting activity</p>
      </div>
    </div>
  `

  // Dinner
  activities += `
    <div class="itinerary-item">
      <div class="itinerary-time">19:00</div>
      <div class="itinerary-content">
        <h4>Dinner at ${getLocalRestaurant(destination, true)}</h4>
        <p>Experience the local nightlife and cuisine</p>
      </div>
    </div>
  `

  return activities
}

// Get morning activity based on destination and interests
function getMorningActivity(dayNumber, destination, interests) {
  const activitiesMap = {
    "Paris, France": [
      "Visit the Eiffel Tower",
      "Explore the Louvre Museum",
      "Walk along the Seine River",
      "Visit Notre-Dame Cathedral",
      "Explore Montmartre and Sacré-Cœur",
    ],
    "Tokyo, Japan": [
      "Visit Tsukiji Fish Market",
      "Explore Meiji Shrine",
      "Visit Tokyo Skytree",
      "Explore Asakusa and Senso-ji Temple",
      "Visit the Imperial Palace Gardens",
    ],
    "New York, USA": [
      "Visit the Statue of Liberty",
      "Explore Central Park",
      "Visit the Metropolitan Museum of Art",
      "Walk the High Line",
      "Visit the 9/11 Memorial",
    ],
    // Add more destinations as needed
  }

  const activities = activitiesMap[destination] || [
    "City Tour",
    "Visit Local Museum",
    "Explore Historic District",
    "Visit Famous Landmark",
    "Local Market Tour",
  ]

  // Use day number to select activity (cycle through available activities)
  const index = (dayNumber - 1) % activities.length
  return activities[index]
}

// Get afternoon activity based on destination and interests
function getAfternoonActivity(dayNumber, destination, interests) {
  const activitiesMap = {
    "Paris, France": [
      "Shop on the Champs-Élysées",
      "Visit the Musée d'Orsay",
      "Explore the Luxembourg Gardens",
      "Visit the Centre Pompidou",
      "Take a Seine River Cruise",
    ],
    "Tokyo, Japan": [
      "Shop in Shibuya",
      "Visit Ueno Park and Zoo",
      "Explore Akihabara Electric Town",
      "Visit the Tokyo National Museum",
      "Relax in Shinjuku Gyoen National Garden",
    ],
    "New York, USA": [
      "Shop on Fifth Avenue",
      "Visit the Museum of Modern Art",
      "Explore Greenwich Village",
      "Visit the Empire State Building",
      "Take a Harbor Cruise",
    ],
    // Add more destinations as needed
  }

  const activities = activitiesMap[destination] || [
    "Shopping Tour",
    "Visit Art Gallery",
    "Explore Local Neighborhood",
    "Visit Viewpoint",
    "Boat Tour",
  ]

  // Use day number to select activity (cycle through available activities)
  const index = (dayNumber - 1) % activities.length
  return activities[index]
}

// Get local restaurant based on destination
function getLocalRestaurant(destination, isEvening = false) {
  const restaurantsMap = {
    "Paris, France": isEvening
      ? ["Le Jules Verne", "L'Ambroisie", "Le Cinq", "Epicure", "Guy Savoy"]
      : ["Café de Flore", "Les Deux Magots", "Angelina", "Le Comptoir", "Breizh Café"],
    "Tokyo, Japan": isEvening
      ? ["Sukiyabashi Jiro", "Narisawa", "RyuGin", "Sushi Saito", "Quintessence"]
      : ["Tsukiji Sushidai", "Afuri", "Ichiran", "Ippudo", "Maisen"],
    "New York, USA": isEvening
      ? ["Le Bernardin", "Eleven Madison Park", "Per Se", "Daniel", "Gramercy Tavern"]
      : ["Katz's Delicatessen", "Shake Shack", "Levain Bakery", "Russ & Daughters", "Clinton St. Baking Co."],
    // Add more destinations as needed
  }

  const restaurants =
    restaurantsMap[destination] ||
    (isEvening
      ? ["Fine Dining Restaurant", "Local Bistro", "Gourmet Restaurant", "Traditional Restaurant", "Fusion Restaurant"]
      : ["Local Café", "Popular Bistro", "Street Food Market", "Casual Eatery", "Bakery"])

  // Return random restaurant from the list
  return restaurants[Math.floor(Math.random() * restaurants.length)]
}

// Add attraction to itinerary
function addAttractionToItinerary(attractionName) {
  // Find the first day's itinerary
  const firstDay = document.querySelector(".itinerary-day")

  if (firstDay) {
    const itemsContainer = firstDay.querySelector(".itinerary-items")

    // Create new itinerary item
    const newItem = document.createElement("div")
    newItem.className = "itinerary-item"
    newItem.innerHTML = `
      <div class="itinerary-time">16:00</div>
      <div class="itinerary-content">
        <h4>Visit ${attractionName}</h4>
        <p>Added from map</p>
      </div>
    `

    // Add to itinerary
    itemsContainer.appendChild(newItem)

    // Show success message
    alert(`${attractionName} added to your itinerary!`)
  }
}

// Enable itinerary editing
function enableItineraryEditing() {
  let isEditing = false

  editItineraryBtn.addEventListener("click", () => {
    isEditing = !isEditing

    if (isEditing) {
      // Enable editing mode
      editItineraryBtn.textContent = "Done"

      // Make itinerary items editable
      document.querySelectorAll(".itinerary-content h4").forEach((heading) => {
        heading.contentEditable = true
        heading.classList.add("editable")
      })

      document.querySelectorAll(".itinerary-content p").forEach((paragraph) => {
        paragraph.contentEditable = true
        paragraph.classList.add("editable")
      })

      document.querySelectorAll(".itinerary-time").forEach((time) => {
        time.contentEditable = true
        time.classList.add("editable")
      })
    } else {
      // Disable editing mode
      editItineraryBtn.textContent = "Edit"

      // Make itinerary items non-editable
      document.querySelectorAll(".itinerary-content h4, .itinerary-content p, .itinerary-time").forEach((element) => {
        element.contentEditable = false
        element.classList.remove("editable")
      })
    }
  })

  // Save itinerary
  saveItineraryBtn.addEventListener("click", () => {
    // In a real app, you would save to a database or local storage
    alert("Itinerary saved successfully!")

    // If in editing mode, exit it
    if (isEditing) {
      editItineraryBtn.click()
    }
  })
}

// Mock function for adding attractions to the map.  In a real application, this would interact with a mapping API.
function addAttractionsToMap(destination) {
  console.log(`Adding attractions for ${destination} to the map.`)
}
