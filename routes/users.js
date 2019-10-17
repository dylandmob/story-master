const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const emailUser = require('../emailUser');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please add your name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        if (user.isVerified) {
          return res.status(400).json({ msg: 'User already exists' });
        }
        await user.remove();
      }

      user = new User({ name, email }); // Create a new user

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(payload, config.get('jwtEmailSecret'), {
        expiresIn: config.get('emailTokenLife')
      });

      emailUser(email, token);

      res.json({ msg: `Email sent to ${email}` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
