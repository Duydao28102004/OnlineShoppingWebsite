const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
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
  res.render('pages/index', { pageTitle: 'Homepage', user});
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
        req.session.user = {userId: user._id, username: user.username, usertype: user.usertype };
        console.log(user._id);
        res.redirect('/redirect');
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

app.get('/redirect', requireLogin, (req, res) => {
  const user = req.session.user;
  if (user.usertype === 'shipper') {
    res.redirect('/shipper');
  } else if (user.usertype === 'custommer') {
    res.redirect('/custommer');
  } else if (user.usertype === 'seller') {
    res.redirect('/seller');
  } else {
    res.redirect('/');
  }
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

app.get('/shipper', requireLogin, async (req, res) => {
  const user = req.session.user;
  if (user) {
    try {
      const orders = await Order.findOrdersByStatus('delivery');
      res.render('pages/shipper', {pageTitle: 'Shipper', user, orders });
    } catch {
      console.error('Error fetching orders:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.redirect('/');
  }
});

app.post('/shipper', async (req, res) => {
  const orderId = req.body.orderId;
  try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'completed' }, { new: true });

      if (updatedOrder) {
        console.log('Order marked completed');
        res.redirect('/shipper');
      } else {
        res.status(404).json({ error: 'Order not found.' });
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/seller', requireLogin, async (req,res) => {
  try {
    const userSession = req.session.user;
    const user = await User.findOne({ username: userSession.username });
    const products = await Product.findBySellerId(user); 
    console.log(products);
    res.render('pages/seller', { pageTitle: 'Seller', user, products});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
}
});

app.get('/addproduct',requireLogin, (req,res) => {
  const user = req.session.user;
  res.render('pages/addproduct', {user});
});

app.post('/addproduct', async (req,res) => {
  try {
    // Find the seller based on the username in the request body
    const seller = await User.findOne({ username: req.body.username });

    // Check if the seller is found
    if (!seller) {
        return res.status(404).json({ error: 'Seller not found.' });
    }

    // Create a new product associated with the found seller
    const newProduct = new Product({
        seller: seller._id, // Assuming _id is the identifier for the seller in the User model
        name: req.body.name,
        image: req.body.image,
        type: req.body.type,
        price: req.body.price,
        quantity: req.body.quantity,
        rating: req.body.rating,
        description: req.body.description,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();
    
    res.redirect('/seller');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
}
})
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

app.get('/testaddorder', (req, res) => {
  res.render('pages/testaddorder', { pageTitle: 'Add New Order'});
});

app.post('/testaddorder', async (req, res) => {
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

const port = process.env.PORT || 3000; // Use the provided port or default to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});