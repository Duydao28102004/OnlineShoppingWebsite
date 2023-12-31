const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get('/', async (req,res) => {
    try {
        const user = req.session.user;
        if (!user) {
            // Fetch all products from the database
            const products = await Product.find();
  
            // Render the EJS template with the product data
            return res.render('pages/index', { products});
       }
       res.redirect('/redirect');     
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;