const User = require('./models/User');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const { requireLogin } = require('./routes/middleware');

// Set up session middleware
app.use(session({
  secret: 'kjadsfasdjasl', // Replace with a secret key for session encryption
  resave: false,
  saveUninitialized: true,
}));

// Set ejs view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : false}));

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
  res.render('pages/register', { pageTitle: 'Register' });
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

const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});