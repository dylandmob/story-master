const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Campaign = require('../models/Campaign');

// @route   GET api/campaigns
// @desc    Gets all user's campaigns
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user: req.user.id }).sort({
      submittedDate: -1
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

    const { name, imageUrl } = req.body;

    try {
      const newCampaign = new Campaign({
        name,
        imageUrl,
        user: req.user.id,
        admins: [req.user.id]
      });

      const campaign = await newCampaign.save();

      res.json(campaign);
    } catch (err) {
      console.error('Logging error message: ', err.message);
      res.status(500).send('Server Error: ' + err.message);
    }
  }
);

// @route   DELETE api/applications/:id
// @desc    Delete application
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).json({ msg: 'Campaign not found' });

    // Make sure user owns application
    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Campaign.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Campaign removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
