document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);  // Save token in localStorage
      window.location.href = 'https://www.youtube.com';  // Redirect to YouTube
    } else {
      alert(data.error);
    }
  });
  