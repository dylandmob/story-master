const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

module.exports = (req, res, next) => {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    console.log('Decoded User', req.user);

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
