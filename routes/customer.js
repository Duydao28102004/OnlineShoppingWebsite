// customer functions
const express = require('express');
const router = express.Router();

// customer router
router.get('/customer', (req,res) => {
    res.render('pages/customer');
});

module.exports = router;

