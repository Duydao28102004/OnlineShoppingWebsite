const Product = require('../models/Product');
const express = require('express');
const User = require('../models/User');
const Basket = require('../models/Basket');
// const { requireLogin, isCustomer } = require('./middleware');
const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/product', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
  
        // Render the EJS template with the product data
        res.render('pages/product', { pageTitle: 'Our Products', products, error: null});
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/basket', (req, res) => {
    res.render('pages/basket');
});


module.exports = router;