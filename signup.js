document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get form values
  const username = document.getElementById('username').value;
  const number = document.getElementById('number').value;
  const dob = document.getElementById('dob').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Create a user object to send to the server
  const user = {
    username,
    number,
    dob,
    password,
    age,
    gender
  };

  // Make a POST request to the backend server for signup
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    const data = await response.json();  // Parse the JSON response

    if (response.ok) {
      // If signup is successful, show a success message
      alert('Signup successful! Redirecting to login page...');
      window.location.href = 'login.html';  // Redirect to login page
    } else {
      // If there is an error (e.g., user already exists), display the error message
      alert(data.error || 'An error occurred during signup.');
    }

  } catch (error) {
    // Handle any network or unexpected errors
    console.error('Error during signup:', error);
    alert('There was an issue with the signup process. Please try again later.');
  }
});
