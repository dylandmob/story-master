const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Get token from the header
  const token = req.header('x-auth-token');
  const campaignId = req.params.campaignId;

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  if (!campaignId) {
    res.status(404).json({ msg: 'No campaign id is included' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    // Find the user
    let user = await User.findById(decoded.user.id);

    // Find the campaign
    let campaignReference = user.campaigns.find(
      c => c.campaign.toString() === campaignId
    );

    if (!campaignReference.isAdmin) {
      return res
        .status(401)
        .json({ msg: 'Not authorized as an admin of this campaign' });
    }

    next();
  } catch (err) {
    console.error('Error', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
