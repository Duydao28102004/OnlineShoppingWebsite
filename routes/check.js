const User = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const { requireLogin } = require('./middleware');

// Set up session middleware
app.use(session({
  secret: 'kjadsfasdjasl', // Replace with a secret key for session encryption
  resave: false,
  saveUninitialized: true,
}));

app.get('/', requireLogin, (req,res) => {
  const user = req.session.user;
  // Check if the user is logged in
  if (user) {
    // Render the homepage with user information
    res.render('pages/index', { pageTitle: 'Homepage', user});
  } else {
    // Redirect to the login page if the user is not logged in
    res.redirect('/login');
  }
});

app.get('/login', (req,res) => {
  res.render('pages/login', { pageTitle: 'Login', error: null});
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // Successful login
        req.session.user = { username: user.username, usertype: user.usertype};
        res.redirect('/');
        console.log("Successfully logged in");
        return;
      } else {
        // Incorrect password
        res.status(400).render('pages/login', { pageTitle: 'Login', error: "Password doesn't match" });
        return;
      }
    } else {
      // User doesn't exist
      res.status(400).render('pages/login', { pageTitle: 'Login', error: "User doesn't exist" });
      return;
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});

app.get('/register', (req,res) => {
  res.render('pages/register', { pageTitle: 'Register', error: null });
});

app.post("/register", async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    // send new user as response
    res.json(user);
    res.redirect('/login');
    console.log("Successfully register a new account");
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.sendStatus(500);
    } else {
      res.redirect('/login'); // Redirect to the login page or any other page
    }
  });
});