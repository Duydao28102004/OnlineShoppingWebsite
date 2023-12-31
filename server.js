const Order = require('./models/Order');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const authentication = require('./routes/authentication');
const redirect = require('./routes/redirect');
const home = require('./routes/home');
const shipper = require('./routes/shipper');
const seller = require('./routes/seller');
const customer = require('./routes/customer');
const error = require('./routes/error');

app.use(session({
  secret: 'kjadsfasdjasl',
  resave: false,
  saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : false}));

app.use('/', authentication);
app.use('/', redirect);
app.use('/', home);
app.use('/', shipper);
app.use('/', seller);
app.use('/', customer);
app.use('/', error);

app.get('/addorder', (req, res) => {
  res.render('pages/addorder', { pageTitle: 'Add New Order'});
});

app.post('/addorder', async (req, res) => {
  try {
      const orders = await Order.create(req.body);
      console.log('Orders created successfully');
      res.redirect('/login');
  } catch (error) {
      console.error('Error adding new order:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Access the FAQ Page

app.get('/faq', (req, res) => {
  res.render('/public/views/pages/faq.ejs', { pageTitle: 'FAQ'});
});

const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});

app.listen(3000);