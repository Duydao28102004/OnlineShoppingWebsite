const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views', 'login.html'));
});

// Define a route for the register page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views', 'register.html'));
});

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
