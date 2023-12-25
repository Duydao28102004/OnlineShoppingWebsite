const Product = require('../models/Product');
const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
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

router.post('/api/submit-basket', async (req, res) => {
    try {
        user = req.session.user;
        const { basket, totalCost, address } = req.body;
        const products = [];

        for (const item of basket) {
            const productId = item.productId;
            const quantity = item.quantity;
            const productName = item.productName;

            const product = await Product.findById(productId);

            if (!product) {
                console.error(`Product with ID ${productId} not found`);
                continue; // Skip to the next iteration
            }
            console.log(product.quantity);
            // Update the product quantity
            product.quantity -= quantity;
            console.log(product.quantity);
            let productInfo = `${productName}: ${quantity}`;
        
            // Add the object to the products array
            products.push(productInfo.toString());

            // Save the updated product to the database
            await product.save();

            // Log product information to console for demonstration
            console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
        }
        const newOrder = await Order.create({
            customername: user.username,
            products: products.toString(),
            address: address,
            status: "delivery",
            totalCost: totalCost
        });
        console.log(newOrder);

        // Send a success response
        res.json({ message: 'Basket data received successfully' });
        console.log("receive");
    } catch (error) {
        console.error('Error handling basket submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;