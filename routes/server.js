const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config() // load .env variables
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
const UserRouter = require("./User") //import User Routes
const TodoRouter = require("./Todo") // import Todo Routes

// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies
app.use(express.static(path.join(__dirname, "public"), { "extensions": ["html", "htm", "js"] }));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// set the engine to EJS
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'public', 'views'));

// route definitions
app.get('/', (req, res) => {
  res.render('pages/index', { pageTitle: 'Homepage' });
});

app.get('/login', (req, res) => {
  res.render('pages/login', { pageTitle: 'Login' });
});

app.get('/register', (req,res) => {
  res.render('pages/register', { pageTitle: 'Register', error: null });
});

app.post('/register', async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    res.redirect('/login');
    console.log("Successfully register a new account");
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get('/about', (req, res) => {
  res.render('pages/about', { pageTitle: 'About' });
});

app.get('/product', (req, res) => {
  res.render('pages/product', { pageTitle: 'Products' });
});

app.get('/shipper', (req, res) => {
  const user = req.session.user;
  if (user) {
    try {
      const orders = await Order.findOrdersByStatus('delivery');
      res.render('pages/shipper', {pageTitle: 'Shipper', user, orders })
    } catch {
      console.error('Error fetching orders:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.redirect('/')
  }
});

app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing
app.use("/todos", TodoRouter) // send all "/todos" request to TodoRouter

// get data from the MongoDB database

// Start the server
const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});
