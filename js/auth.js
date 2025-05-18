// Authentication functionality
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")
  const loginError = document.getElementById("login-error")
  const signupError = document.getElementById("signup-error")

  // Check if user is already logged in
  checkAuthStatus()

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Validate form
      if (!email || !password) {
        showError(loginError, "Please fill in all fields")
        return
      }

      // In a real app, you would send a request to the API
      // For demo purposes, we'll simulate a successful login
      simulateLogin(email, password)
    })
  }

  // Signup form submission
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const terms = document.getElementById("terms").checked

      // Validate form
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showError(signupError, "Please fill in all fields")
        return
      }

      if (password !== confirmPassword) {
        showError(signupError, "Passwords do not match")
        return
      }

      if (password.length < 6) {
        showError(signupError, "Password must be at least 6 characters")
        return
      }

      if (!terms) {
        showError(signupError, "You must agree to the Terms of Service and Privacy Policy")
        return
      }

      // In a real app, you would send a request to the API
      // For demo purposes, we'll simulate a successful signup
      simulateSignup(firstName, lastName, email, password)
    })
  }

  // Function to show error message
  function showError(element, message) {
    if (element) {
      element.textContent = message
      element.style.display = "block"

      // Hide error after 5 seconds
      setTimeout(() => {
        element.style.display = "none"
      }, 5000)
    }
  }

  // Function to simulate login
  function simulateLogin(email, password) {
    // In a real app, you would send a request to the API
    // For demo purposes, we'll simulate a successful login

    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Logging in..."
    submitBtn.disabled = true

    // Simulate API request
    setTimeout(() => {
      // Reset button
      submitBtn.textContent = originalText
      submitBtn.disabled = false

      // Store user data in localStorage
      const userData = {
        email,
        firstName: "John", // In a real app, this would come from the API
        lastName: "Doe", // In a real app, this would come from the API
      }

      localStorage.setItem("userData", JSON.stringify(userData))
      localStorage.setItem("isLoggedIn", "true")

      // Redirect to home page
      window.location.href = "index.html"
    }, 1500)
  }

  // Function to simulate signup
  function simulateSignup(firstName, lastName, email, password) {
    // In a real app, you would send a request to the API
    // For demo purposes, we'll simulate a successful signup

    // Show loading state
    const submitBtn = signupForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Creating account..."
    submitBtn.disabled = true

    // Simulate API request
    setTimeout(() => {
      // Reset button
      submitBtn.textContent = originalText
      submitBtn.disabled = false

      // Store user data in localStorage
      const userData = {
        email,
        firstName,
        lastName,
      }

      localStorage.setItem("userData", JSON.stringify(userData))
      localStorage.setItem("isLoggedIn", "true")

      // Redirect to home page
      window.location.href = "index.html"
    }, 1500)
  }

  // Function to check authentication status
  function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    // Update UI based on auth status
    const authButtons = document.querySelectorAll(".nav-actions .btn")
    const mobileAuthButtons = document.querySelectorAll(".mobile-actions .btn")

    if (isLoggedIn) {
      // Get user data
      const userData = JSON.parse(localStorage.getItem("userData") || "{}")

      // Replace auth buttons with user menu
      if (authButtons.length > 0) {
        const navActions = authButtons[0].parentElement

        // Remove auth buttons
        authButtons.forEach((btn) => btn.remove())

        // Add user menu
        const userMenu = document.createElement("div")
        userMenu.className = "user-menu"
        userMenu.innerHTML = `
          <button class="user-menu-btn">
            <span>${userData.firstName || "User"}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="user-menu-dropdown">
            <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
            <a href="itineraries.html"><i class="fas fa-route"></i> My Itineraries</a>
            <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
          </div>
        `

        navActions.appendChild(userMenu)

        // Add event listener to toggle dropdown
        const userMenuBtn = userMenu.querySelector(".user-menu-btn")
        const userMenuDropdown = userMenu.querySelector(".user-menu-dropdown")

        userMenuBtn.addEventListener("click", () => {
          userMenuDropdown.classList.toggle("active")
        })

        // Add event listener to logout button
        const logoutBtn = userMenu.querySelector("#logout-btn")
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault()
          logout()
        })

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
          if (!userMenu.contains(e.target)) {
            userMenuDropdown.classList.remove("active")
          }
        })
      }

      // Update mobile menu
      if (mobileAuthButtons.length > 0) {
        const mobileActions = mobileAuthButtons[0].parentElement

        // Remove auth buttons
        mobileAuthButtons.forEach((btn) => btn.remove())

        // Add user links
        mobileActions.innerHTML = `
          <a href="profile.html" class="mobile-user-link"><i class="fas fa-user"></i> My Profile</a>
          <a href="itineraries.html" class="mobile-user-link"><i class="fas fa-route"></i> My Itineraries</a>
          <a href="#" id="mobile-logout-btn" class="mobile-user-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
        `

        // Add event listener to logout button
        const mobileLogoutBtn = document.getElementById("mobile-logout-btn")
        if (mobileLogoutBtn) {
          mobileLogoutBtn.addEventListener("click", (e) => {
            e.preventDefault()
            logout()
          })
        }
      }
    }
  }

  // Function to logout
  function logout() {
    // Clear user data
    localStorage.removeItem("userData")
    localStorage.removeItem("isLoggedIn")

    // Redirect to home page
    window.location.href = "index.html"
  }
})
