const Product = require('../models/Product');
const express = require('express');
const Order = require('../models/Order');
const { requireLogin, isCustomer } = require('./middleware');
const router = express.Router();

const multer = require('multer');
const e = require('express');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/customer', requireLogin, isCustomer, async (req, res) => {
    try {
        const user = req.session.user;
        const filter = req.query.filter;
        console.log(filter);
        const category = req.query.category;
        console.log(category);
        let products;
        if (!filter || filter === 'all') {
            products = await Product.find();
        } else if (filter === 'lowestprice') {
            products = await Product.find().sort({ price: 1 });
        } else if (filter === 'highestprice') {
            products = await Product.find().sort({ price: -1 });
        } else if (filter === 'rating') {
            products = await Product.find().sort({ rating: -1 });
        }
        if (category && category !== 'all') {
            products = products.filter(product => product.type === category);
        }
        res.render('pages/product', { pageTitle: 'Customer', user, products, filter, category });
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
        const { basket, totalCost, address, phoneNumber } = req.body;
        const products = [];
        console.log(phoneNumber);

        for (const item of basket) {
            const productId = item.productId;
            const quantity = item.quantity;
            const productName = item.productName;

            const product = await Product.findById(productId);

            if (!product) {
                const errorMessage = `Product ${productName} is unavailable`;
                console.error(errorMessage);

                return res.json({ error: errorMessage });
            }

            // Check if there is enough quantity for the product
            if (quantity > product.quantity) {
                // Not enough quantity for the product
                const errorMessage = `Not enough quantity available for ${productName}. Available quantity: ${product.quantity}`;
                console.error(errorMessage);

                // Send a response to the frontend indicating the error
                return res.json({ error: errorMessage });
            }
        
            // Add the object to the products array
            products.push({productName: productName, productPrice: product.price, productImage: product.image, quantity: quantity});

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
            products: products,
            address: address,
            phonenumber: phoneNumber,
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

router.get('/product/:id', requireLogin, isCustomer, async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        console.log(product.type);
        // Find 4 random products with the same type but different from the current product
        let similarProducts = await Product.aggregate([
            { $match: { _id: { $ne: product._id }, type: product.type } },
            { $sample: { size: 4 } }
        ]);

        console.log(similarProducts);

        res.render('pages/productdetail', { pageTitle: 'Product', similarProducts, product, error: null });
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/customer/order', requireLogin, isCustomer, async (req, res) => {
    const user = req.session.user;
    if (user) {
        try {
            console.log(user.username);
            const orders = await Order.find({ customername: user.username });
            console.log(orders);
            res.render('pages/orderhistory', { pageTitle: 'Order', user, orders });
        } catch {
            console.error('Error fetching orders:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.redirect('/');
    }
});

module.exports = router;