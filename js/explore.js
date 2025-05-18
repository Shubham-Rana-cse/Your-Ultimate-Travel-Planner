// Explore page functionality
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const destinationSearch = document.getElementById("destination-search")
  const destinationCards = document.querySelectorAll(".destination-card")
  const filterTabs = document.querySelectorAll(".filter-tab")
  const filterTags = document.querySelectorAll(".filter-tag")
  const paginationBtns = document.querySelectorAll(".pagination-btn")

  // Filter destinations by search input
  destinationSearch.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase()

    destinationCards.forEach((card) => {
      const destinationName = card.querySelector("h3").textContent.toLowerCase()
      const destinationLocation = card.querySelector(".destination-location").textContent.toLowerCase()
      const destinationDesc = card.querySelector(".destination-description").textContent.toLowerCase()

      // Check if card matches search
      const isMatch =
        destinationName.includes(searchValue) ||
        destinationLocation.includes(searchValue) ||
        destinationDesc.includes(searchValue)

      // Show/hide card
      card.style.display = isMatch ? "block" : "none"
    })

    // Reset filters
    filterTabs.forEach((tab) => tab.classList.remove("active"))
    filterTags.forEach((tag) => tag.classList.remove("active"))
    filterTabs[0].classList.add("active") // Set "All" tab as active
  })

  // Filter by category (tabs)
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.getAttribute("data-filter")

      // Update active tab
      filterTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Filter cards
      destinationCards.forEach((card) => {
        if (category === "all") {
          card.style.display = "block"
        } else {
          const cardCategory = card.getAttribute("data-category")
          card.style.display = cardCategory === category ? "block" : "none"
        }
      })

      // Reset search and tags
      destinationSearch.value = ""
      filterTags.forEach((tag) => tag.classList.remove("active"))
    })
  })

  // Filter by tags
  filterTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      // Toggle active state
      this.classList.toggle("active")

      // Get all active tags
      const activeTags = Array.from(filterTags)
        .filter((t) => t.classList.contains("active"))
        .map((t) => {
          if (t.hasAttribute("data-season")) return `data-season="${t.getAttribute("data-season")}"`
          if (t.hasAttribute("data-feature")) return `data-feature="${t.getAttribute("data-feature")}"`
          if (t.hasAttribute("data-budget")) return `data-budget="${t.getAttribute("data-budget")}"`
          return ""
        })
        .filter((attr) => attr !== "")

      // If no active tags, show all cards
      if (activeTags.length === 0) {
        destinationCards.forEach((card) => (card.style.display = "block"))
        return
      }

      // Filter cards
      destinationCards.forEach((card) => {
        const cardAttributes = card.outerHTML
        const isMatch = activeTags.every((attr) => cardAttributes.includes(attr))
        card.style.display = isMatch ? "block" : "none"
      })

      // Reset search and category tabs
      destinationSearch.value = ""
      filterTabs.forEach((tab) => tab.classList.remove("active"))
    })
  })

  // Pagination
  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.disabled) return

      // Update active button
      paginationBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // In a real app, you would fetch the next page of results
      // For demo purposes, we'll just show an alert
      if (!this.textContent.includes("chevron")) {
        alert(`Navigating to page ${this.textContent}`)
      }
    })
  })
})
