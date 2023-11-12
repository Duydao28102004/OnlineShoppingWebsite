const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config() // load .env variables
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
const UserRouter = require("./routes/User") //import User Routes
const TodoRouter = require("./routes/Todo") // import Todo Routes

// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies
app.use(express.static(path.join(__dirname, "public"), { "extensions": ["html", "htm", "js"] }));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views', 'login.html'));
});

// Define a route for the register page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views', 'register.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/views', 'index.html'));
});

app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing
app.use("/todos", TodoRouter) // send all "/todos" request to TodoROuter

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
