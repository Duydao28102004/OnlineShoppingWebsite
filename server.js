const Order = require('./models/Order');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const authentication = require('./routes/authentication');
const redirect = require('./routes/redirect');
const home = require('./routes/home');
const shipper = require('./routes/shipper');
const seller = require('./routes/seller');
const customer = require('./routes/customer');
const error = require('./routes/error');

app.use(session({
  secret: 'kjadsfasdjasl',
  resave: false,
  saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : false}));

app.use('/', authentication);
app.use('/', redirect);
app.use('/', home);
app.use('/', shipper);
app.use('/', seller);
app.use('/', customer);
app.use('/', error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:3000`);
});