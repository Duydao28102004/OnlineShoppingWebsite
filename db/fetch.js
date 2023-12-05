const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// connect to MongoDB
mongoose.connect('mongodb+srv://TungTT:ySAn8E1flmR7oOzY@cluster0.rtiqjut.mongodb.net/CommercialWebsite', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('/public/views/pages/product.ejs', {products: products});
    } catch (err) {
        console.log(err);
        res.status(500).send('500 Server Error!');
    }
});

// exports of router...
module.exports = router;
