// Navbar functionality
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    menuToggle.classList.toggle("active")

    // Toggle icon
    const icon = menuToggle.querySelector("i")
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")
      menuToggle.classList.remove("active")

      // Reset icon
      const icon = menuToggle.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
})
