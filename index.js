const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const key = require('./config/key');
require('./models/User'); 
require('./services/passport');
// const passportConfig = require('./services/passport')
// const authRoutes = require('./routes/authRoutes');

mongoose.connect(key.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [key.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billngRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);