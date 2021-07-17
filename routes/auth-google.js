const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');
// const auth = require('../middleware/auth');

const User = require('../models/User');

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
// https://www.googleapis.com/auth/plus.login
router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/sign-in' }),
  (req, res) => {
    // Create jwts and send back to front end
    console.log('Req user', req.user);

    const payload = { user: { id: req.user.id } };

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: config.get('tokenLife')
    });
    const refreshToken = jwt.sign(payload, config.get('jwtRefreshSecret'), {
      expiresIn: config.get('refreshTokenLife')
    });
    if (process.env.NODE_ENV === 'production') {
      res.redirect(`/sign-in?token=${token}&refreshToken=${refreshToken}`);
    } else {
      res.status(301).redirect(`http://localhost:3000/sign-in?token=${token}&refreshToken=${refreshToken}`);
    }
  }
);

module.exports = router;
