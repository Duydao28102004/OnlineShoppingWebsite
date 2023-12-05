const User = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/login', (req,res) => {
    res.render('pages/login', { pageTitle: 'Login', error: null});
});
  
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
  
      if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // Successful login
          req.session.user = {userId: user._id, username: user.username, usertype: user.usertype };
          console.log(user._id);
          res.redirect('/redirect');
          console.log("Successfully logged in");
          return;
        } else {
          // Incorrect password
          res.status(400).render('pages/login', { pageTitle: 'Login', error: "Password doesn't match" });
          return;
        }
      } else {
        // User doesn't exist
        res.status(400).render('pages/login', { pageTitle: 'Login', error: "User doesn't exist" });
        return;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
});

router.get('/register', (req,res) => {
    res.render('pages/register', { pageTitle: 'Register', error: null });
  });
  
router.post('/register', async (req, res) => {
    try {
      // hash the password
      req.body.password = await bcrypt.hash(req.body.password, 10);
      // create a new user
      const user = await User.create(req.body);
      res.redirect('/login');
      console.log("Successfully register a new account");
    } catch (error) {
      res.status(400).json({ error });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.sendStatus(500);
      } else {
        res.redirect('/login'); // Redirect to the login page or any other page
      }
    });
});

module.exports = router;