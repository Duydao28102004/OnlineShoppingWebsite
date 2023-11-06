const express = require("express");
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login'); // Renders login.html using the template engine
  });
  
router.get('/register', (req, res) => {
    res.render('register'); // Renders register.html using the template engine
});
  
module.exports = router;