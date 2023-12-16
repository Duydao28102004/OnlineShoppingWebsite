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

const isCustomer = (req, res, next) => {
  user = req.session.user;
  if (user.usertype === "customer") {
    return next();
  } else {
    res.redirect('/error');
  }
}

module.exports = {
  requireLogin, isSeller, isCustomer, isShipper
};