const Product = require('../models/Product');
const express = require('express');
const Order = require('../models/Order');
const { requireLogin, isCustomer } = require('./middleware');
const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/customer', requireLogin, isCustomer, async (req, res) => {
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

router.get('/basket', requireLogin, isCustomer, (req, res) => {
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

            // Check if there is enough quantity for the product
            if (quantity > product.quantity) {
                // Not enough quantity for the product
                const errorMessage = `Not enough quantity available for ${productName}. Available quantity: ${product.quantity}`;
                console.error(errorMessage);

                // Send a response to the frontend indicating the error
                return res.json({ error: errorMessage });
            }

            
            let productInfo = `${productName}: ${quantity}`;
        
            // Add the object to the products array
            products.push(productInfo.toString());

            console.log(product.quantity);
            // Update the product quantity
            product.quantity -= quantity;
            console.log(product.quantity);

            // Save the updated product to the database
            if (product.quantity <= 0) {
                await Product.deleteOne({ _id: productId });
            } else {
                // Save the updated product to the database
                await product.save();
            }

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
        res.json({ message: 'Order received successfully' });
        console.log("receive");
    } catch (error) {
        console.error('Error handling basket submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.render('pages/productdetail', { pageTitle: 'Product', product, error: null});
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;