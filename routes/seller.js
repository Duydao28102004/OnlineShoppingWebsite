const Product = require('../models/Product');
const User = require('../models/User');
const express = require('express');
const { requireLogin, isSeller } = require('./middleware');
const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/seller', requireLogin, isSeller, async (req,res) => {
    try {
      const userSession = req.session.user;
      const user = await User.findOne({ username: userSession.username });
      const products = await Product.findBySellerId(user); 
      res.render('pages/seller', { pageTitle: 'Seller', user, products});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
  });
  
router.get('/addproduct',requireLogin, isSeller, (req,res) => {
    const user = req.session.user;
    res.render('pages/addproduct', {user});
});
  
router.post('/addproduct', upload.single('image'), async (req,res) => {
    try {

      const imageData = req.file.buffer;
      const base64Data = imageData.toString('base64');
      // Find the seller based on the username in the request body
      const seller = await User.findOne({ username: req.body.username });
  
      // Check if the seller is found
      if (!seller) {
          return res.status(404).json({ error: 'Seller not found.' });
      }
  
      // Create a new product associated with the found seller
      const newProduct = new Product({
          seller: seller._id,
          name: req.body.name,
          image: base64Data,
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

module.exports = router;