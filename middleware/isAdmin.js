const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// middleware for checking if the user is an admin of the campaign, then sets the req.isAdmin accordingly
module.exports = async (req, res, next) => {
  // get token from the header
  const token = req.header('x-auth-token');
  const campaignId = req.params.campaignId;

  // check if no campaignId
  if (!campaignId) {
    return res.status(404).json({ msg: 'No campaign id is included' });
  }

  // check if no token
  if (!token || token === 'null') {
    req.isAdmin = false;
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    // find the user
    let user = await User.findById(decoded.user.id);

    // find the campaign
    let campaignReference = user.campaigns.find(
      c => c.campaign.toString() === campaignId
    );

    // user is admin if campaignReference is valid and isAdmin is true
    req.isAdmin = campaignReference && campaignReference.isAdmin ? true : false;

    next();
  } catch (err) {
    console.error('Error', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
