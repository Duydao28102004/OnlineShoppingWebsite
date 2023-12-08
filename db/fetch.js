const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const DATABASE_URL= "mongodb+srv://TungTT:ySAn8E1flmR7oOzY@cluster0.rtiqjut.mongodb.net/CommercialWebsite";

// connect to MongoDB
mongoose.connect(DATABASE_URL);

// fetch data into the product.ejs page
router.get('/', async (req, res) => {
    const products = await Product.find({}).sort('name');
    res.render('product', { products: products });
});

// exports of router...
module.exports = router;
