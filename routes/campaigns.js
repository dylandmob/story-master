const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Campaign = require('../models/Campaign');
const User = require('../models/User');

// @route   GET api/campaigns
// @desc    Gets all user's campaigns
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    let ids = user.campaigns.map(c => c.campaign);
    let campaigns = await Campaign.find({ _id: { $in: ids } });

    console.log('Campaigns', campaigns);
    campaigns.toArray();
    console.log('Campaigns 2', campaigns);

    await campaigns.sort({
      dateLastModified: -1
    });

    res.json(campaigns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/campaigns
// @desc    Add new campaign
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', "Campaign's name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, imageUrl } = req.body;

    try {
      // Create new campaign
      const newCampaign = new Campaign({
        name,
        description,
        imageUrl,
        users: [{ user: req.user.id, isAdmin: true }]
      });

      const campaign = await newCampaign.save();

      console.log('New Campaign', campaign);

      // Add new campaign reference to user
      await User.findByIdAndUpdate(req.user.id, {
        $push: { campaigns: { campaign: campaign._id, isAdmin: true } }
      });

      res.json(campaign);
    } catch (err) {
      console.error('Logging error message: ', err.message);
      res.status(500).send('Server Error: ' + err.message);
    }
  }
);

// @route   PATCH api/campaigns/:id
// @desc    Edit campaign
// @access  Private
router.patch(
  '/:id',
  [
    auth,
    [
      check('name', "Campaign's name should be a string").isString(),
      check(
        'name',
        'Name should be between 3 characters and 30 characters in length'
      ).isLength({ min: 3, max: 30 }),
      check('imageUrl', 'ImageUrl should be a string').isString()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, imageUrl } = req.body;

    try {
      let campaign = await Campaign.findById(req.params.id);

      // If no campaign was found
      if (!campaign) return res.status(404).json({ msg: 'Campaign not found' });

      // Check if user is connected to the campaign
      let user = campaign.users.find(e => {
        return e.user.toString() === req.user.id;
      });

      // Check to see if user exists and is an admin
      if (!user || !user.isAdmin) {
        return res.status(401).json({ msg: 'Not authorized to edit campaign' });
      }

      // Normalize the data
      let patchData = {};
      if (name) patchData.name = name;
      if (description) patchData.description = name;
      if (imageUrl) patchData.imageUrl = name;

      // Edit the campaign
      campaign.update({ $set: patchData });

      console.log('Edited campaign', campaign);

      res.json(campaign);
    } catch (err) {
      console.error('Logging error message: ', err.message);
      res.status(500).send('Server Error: ' + err.message);
    }
  }
);

// @route   DELETE api/campaigns/:id
// @desc    Delete campaign
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let campaign = await Campaign.findById(req.params.id);

    // If no campaign was found
    if (!campaign) return res.status(404).json({ msg: 'Campaign not found' });

    // Check if user is connected to the campaign
    let user = campaign.users.find(e => {
      return e.user.toString() === req.user.id;
    });

    // Check to see if user exists and is an admin
    if (!user || !user.isAdmin) {
      return res.status(401).json({ msg: 'Not authorized to delete campaign' });
    }

    // Remove campaign reference in users
    await campaign.users.forEach(async element => {
      await User.findByIdAndUpdate(element.user, {
        $pull: { campaigns: { campaign: campaign.id } }
      });
    });

    campaign.remove();

    res.json({ msg: 'Campaign removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
