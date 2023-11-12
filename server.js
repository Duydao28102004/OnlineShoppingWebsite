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

// Set ejs view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('pages/index', { pageTitle: 'Homepage' });
});

app.get('/login', (req, res) => {
  res.render('pages/login', { pageTitle: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('pages/register', { pageTitle: 'Register' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { pageTitle: 'About' });
});

app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing
app.use("/todos", TodoRouter) // send all "/todos" request to TodoROuter

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
