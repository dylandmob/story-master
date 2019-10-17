const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const emailUser = require('../emailUser');
const User = require('../models/User');

// @route   GET api/auth
// @desc    Gets logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Sign Up

// Request to see if exisiting user returns false
// POST to /auth/email

// One request to create user from email and name / then it will send an email
// POST to /users

// One request to use token from email to sign in with and verify user
// POST to /auth

// Sign In

// One request to see if email is existing user / send email to sign in
// POST to /auth/email

// One request to use token from email to sign in with
// POST to /auth

// @route   POST api/auth/email
// @desc    Send user a email token to sign in with
// @access  Public
router.post(
  '/email',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ msg: 'No user was found for this email' });
      }

      const payload = { user: { id: user.id } };

      const token = jwt.sign(payload, config.get('jwtEmailSecret'), {
        expiresIn: config.get('emailTokenLife')
      });

      emailUser(email, token);

      res.json({ msg: `Email sent to ${email}` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error: ' + err.message);
    }
  }
);

// @route   POST api/auth
// @desc    Take email token from magic link and sign in
// @access  Private
router.post('/', async (req, res) => {
  // Get token from the body
  const token = req.body.emailToken;

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  let user = null;

  try {
    const decoded = jwt.verify(token, config.get('jwtEmailSecret'));
    user = await User.findById(decoded.user.id);
  } catch (err) {
    console.error(err.message);
    console.error(err.name);
    if (err.name === 'TokenExpiredError') {
      const expiredDecoded = jwt.verify(token, config.get('jwtEmailSecret'), {
        ignoreExpiration: true
      });
      let expiredUser = await User.findById(expiredDecoded.user.id);
      if (!expiredUser.isVerified) {
        await User.findByIdAndRemove(expiredDecoded.user.id);
        return res.status(401).send('Token has expired.');
      }
    } else {
      return res.status(500).send('Server Error: ' + err.message);
    }
  }

  console.log('User!', user);

  try {
    if (!user) {
      return res.status(400).json({ msg: 'No user was found for this id' });
    }

    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: config.get('tokenLife')
    });
    const refreshToken = jwt.sign(payload, config.get('jwtRefreshSecret'), {
      expiresIn: config.get('refreshTokenLife')
    });

    if (!user.isVerified) {
      user = await User.findByIdAndUpdate(user.id, {
        $set: { isVerified: true }
      });
    }

    let data = {
      token,
      refreshToken,
      isAdmin: user.isAdmin
    };

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: ' + err.message);
  }
});

// @route   POST api/auth/token
// @desc    Refresh the token
// @access  Private
router.post('/token', (req, res) => {
  // Get token from the header
  const currentToken = req.header('x-refresh-token');

  // Check if not token
  if (!currentToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(currentToken, config.get('jwtRefreshSecret'));

    const user = decoded.user;

    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: config.get('tokenLife')
    });
    const refreshToken = jwt.sign(payload, config.get('jwtRefreshSecret'), {
      expiresIn: config.get('refreshTokenLife')
    });

    res.json({ token, refreshToken, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

module.exports = router;
