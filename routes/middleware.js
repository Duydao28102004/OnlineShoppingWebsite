// Middleware to check if the user is logged in
const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
};

const isShipper = (req, res, next) => {
  user = req.session.user;
  if (user.usertype === "shipper") {
    return next();
  } else {
    res.redirect('/error');
  }
}

const isSeller = (req, res, next) => {
  user = req.session.user;
  if (user.usertype === "seller") {
    return next();
  } else {
    res.redirect('/error');
  }
}

const isCustommer = (req, res, next) => {
  user = req.session.user;
  if (user.usertype === "custommer") {
    return next();
  } else {
    res.redirect('/error');
  }
}


// export custom middleware
module.exports = {
  requireLogin, isSeller, isCustommer, isShipper
};