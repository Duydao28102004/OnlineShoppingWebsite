const express = require('express');
const { requireLogin } = require('./middleware');
const router = express.Router();

router.get('/', requireLogin, (req,res) => {
    const user = req.session.user;
    res.render('pages/index', { pageTitle: 'Homepage', user});
});

module.exports = router;