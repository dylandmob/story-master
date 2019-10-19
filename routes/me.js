const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const emailUser = require('../emailUser');
const User = require('../models/User');

// @route   GET api/me
// @desc    Get a user using their token
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'No user was found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.patch(
  '/',
  [
    auth,
    [
      check('name', "User's name should be a string").isString(),
      check(
        'name',
        'Name should be between 3 characters and 25 characters in length'
      ).isLength({ min: 3, max: 25 }),
      check('imageUrl', 'ImageUrl should be a string').isString()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, imageUrl } = req.body;
    try {
      // Find the user using the token
      let user = await User.findById(req.user.id);

      // Check to see if a valid user
      if (!user) return res.status(404).json({ msg: 'User not found' });

      // Normalize the data
      let patchData = {};
      if (name) patchData.name = name;
      if (imageUrl) patchData.imageUrl = imageUrl;

      // Edit the user
      await user.updateOne({ $set: patchData });

      res.json(user);
    } catch (error) {}
  }
);

module.exports = router;
