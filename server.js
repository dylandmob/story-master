require('dotenv').config();

const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
require('./config/passport-setup');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));

// intialize express session middleware
var session = require('express-session');
app.use(session({ secret: process.env.SESSION_SECRET }));

// initialize passport
app.enable('trust proxy');
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

// Define Routes
app.use('/auth/google', require('./routes/auth-google'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/me', require('./routes/me'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
