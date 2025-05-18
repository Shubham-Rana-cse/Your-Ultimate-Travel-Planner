// Profile page functionality
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const authCheckMessage = document.getElementById('auth-check-message');
  const loadingIndicator = document.getElementById('loading-indicator');
  const profileContent = document.getElementById('profile-content');
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const profileForm = document.getElementById('profile-form');
  const profileActions = document.querySelector('.profile-actions');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  
  // Check if user is logged in
  checkAuth();
  
  // Function to check authentication
  function checkAuth() {
    // In a real app, you would check if the user is logged in
    // For demo purposes, we'll simulate this
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      // Show auth check message
      loadingIndicator.style.display = 'none';
      authCheckMessage.style.display = 'flex';
      return;
    }
    
    // User is logged in, load profile
    loadProfile();
  }
  
  // Function to load profile
  function loadProfile() {
    // Show loading indicator
    loadingIndicator.style.display = 'flex';
    authCheckMessage.style.display = 'none';
    
    // In a real app, you would fetch data from an API
    // For demo purposes, we'll use setTimeout to simulate loading
    setTimeout(() => {
      // Hide loading indicator
      loadingIndicator.style.display = 'none';
      
      // Show profile content
      profileContent.style.display = 'block';
      
      // Get user data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      // Populate form
      document.getElementById('first-name').value = userData.firstName || '';
      document.getElementById('last-name').value = userData.lastName || '';
      document.getElementById('email').value = userData.email || '';
      
      // Set stats
      document.getElementById('itineraries-count').textContent = '3';
      document.getElementById('destinations-count').textContent = '8';
      document.getElementById('days-planned').textContent = '21';
    }, 1500);
  }
  
  // Edit profile button
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      // Enable form fields
      const formInputs = profileForm.querySelectorAll('input');
      formInputs.forEach(input => {
        if (input.id !== 'email') { // Don't allow email to be edited
          input.disabled = false;
        }
      });
      
      // Show actions
      profileActions.style.display = 'flex';
      
      // Hide edit button
      editProfileBtn.style.display = 'none';
    });
  }
  
  // Cancel edit button
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      // Disable form fields
      const formInputs = profileForm.querySelectorAll('input');
      formInputs.forEach(input => {
        input.disabled = true;
      });
      
      // Hide actions
      profileActions.style.display = 'none';
      
      // Show edit button
      editProfileBtn.style.display = 'block';
      
      // Reset form
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      document.getElementById('first-name').value = userData.firstName || '';
      document.getElementById('last-name').value = userData.lastName || '';
    });
  }
  
  // Profile form submission
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      
      // Validate form
      if (!firstName || !lastName) {
        alert('Please fill in all fields');
        return;
      }
      
      // In a real app, you would send a request to the API
      // For demo purposes, we'll simulate a successful update
      simulateProfileUpdate(firstName, lastName);
    });
  }
  
  // Function to simulate profile update
  function simulateProfileUpdate(firstName, lastName) {
    // In a real app, you would send a request to the API
    // For demo purposes, we'll simulate a successful update
    
    // Show loading state
    const submitBtn = profileForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.\
