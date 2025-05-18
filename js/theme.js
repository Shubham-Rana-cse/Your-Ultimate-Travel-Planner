// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Check for saved theme preference
  function loadThemePreference() {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      body.classList.add("dark-mode")
    } else {
      body.classList.remove("dark-mode")
    }
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode")
      localStorage.setItem("theme", "light")
    } else {
      body.classList.add("dark-mode")
      localStorage.setItem("theme", "dark")
    }
  })

  // Load theme preference on page load
  loadThemePreference()
})
