const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/auth/token
// @desc    Refresh the token
// @access  Private
router.post('/token', (req, res) => {
  // Get token from the header
  const currentToken = req.body.refreshToken;

  // Check if not token
  if (!currentToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(currentToken, config.get('jwtRefreshSecret'));

    const user = decoded.user;

    const payload = { user: { id: user.id } };

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: config.get('tokenLife')
    });
    const refreshToken = jwt.sign(payload, config.get('jwtRefreshSecret'), {
      expiresIn: config.get('refreshTokenLife')
    });

    res.json({ token, refreshToken });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

module.exports = router;
