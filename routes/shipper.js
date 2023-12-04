const Order = require('../models/Order');
const express = require('express');
const { requireLogin } = require('./middleware');
const router = express.Router();

router.get('/shipper', requireLogin, async (req, res) => {
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
  
router.post('/shipper', async (req, res) => {
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

module.exports = router;