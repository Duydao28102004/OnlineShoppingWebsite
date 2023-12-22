const Order = require('./models/Order');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');

// import routes
const authentication = require('./routes/authentication');
const redirect = require('./routes/redirect');
const home = require('./routes/home');
const shipper = require('./routes/shipper');
const seller = require('./routes/seller');
const error = require('./routes/error')

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

app.use('/', authentication);
app.use('/', redirect);
app.use('/', home);
app.use('/', shipper);
app.use('/', seller)
app.use('/', error);

app.get('/order', (req, res) => {
  res.render('pages/order', { pageTitle: 'Add New Order'});
});

app.post('/order', async (req, res) => {
  try {
      // Use insertMany with ordered: false to bypass unique constraints
      const orders = await Order.create(req.body);
      console.log('Orders created successfully');
      res.redirect('/login');
  } catch (error) {
      // Handle errors appropriately
      console.error('Error adding new order:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Access the FAQ Page
app.get('/faq', (req, res) => {
  res.render('pages/faq', { pageTitle: 'FAQ'});
});

app.get('/faqnew', (req, res) => {
  res.render('pages/faqnew', { pageTitle: 'FAQ (NEW)'});
});

const port = process.env.PORT || 5500; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:5500`);
});

app.listen(5500);