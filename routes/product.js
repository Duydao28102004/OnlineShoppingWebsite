const Product = require('../models/Product');
const express = require('express');
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

router.get('/product/productdetail/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('pages/productdetail', { product, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;