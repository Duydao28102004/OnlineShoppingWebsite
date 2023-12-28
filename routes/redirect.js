const express = require('express');
const { requireLogin } = require('./middleware');
const router = express.Router();
router.get('/redirect', requireLogin, (req, res) => {
    const user = req.session.user;
    if (user.usertype === 'shipper') {
      res.redirect('/shipper');
    } else if (user.usertype === 'customer') {
      res.redirect('/customer');
    } else if (user.usertype === 'seller') {
      res.redirect('/seller');
    } else {
      res.redirect('/');
    }
});

module.exports = router;