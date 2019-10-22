const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { check, validationResult } = require('express-validator');

const Tag = require('../models/Tag');
const Cards = require('../models/Card');

// @route   GET api/campaigns/:campaignId/cards
// @desc    Gets the campaign's cards
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const cards = await Card.find({ campaign: req.params.campaignId }).sort({
      dateLastModified: -1
    });

    res.json(cards);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/campaigns/:campaignId/cards
// @desc    Create a new card
// @access  Admin
router.post(
  '/',
  [
    admin,
    [
      check('name', "Card's name is required")
        .not()
        .isEmpty(),
      check(
        'tags',
        'There needs to be at least one tag and less than 10'
      ).isLength({ min: 0, max: 10 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, privateDescription, imageUrl, tags } = req.body;

    try {
      const newCard = new Card({
        campaign: req.params.campaignId,
        name,
        description,
        privateDescription,
        imageUrl,
        tags
      });

      const card = await newCard.save();

      res.json(card);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// @route   PATCH api/campaigns/:campaignId/cards/:cardId
// @desc    Edit a card
// @access  Admin
router.patch('/:cardId', admin, async (req, res) => {
  const { name, description, privateDescription, imageUrl, tags } = req.body;

  try {
    let card = await Card.findById(req.params.cardId);

    // If no card was found
    if (!tag) return res.status(404).json({ msg: 'Card not found' });

    // Normalize the data
    let patchData = {};
    if (name) patchData.name = name;
    if (description) patchData.description = description;
    if (privateDescription) patchData.privateDescription = privateDescription;
    if (imageUrl) patchData.imageUrl = imageUrl;
    if (tags) patchData.tags = tags;

    // Edit the card
    await card.updateOne({ $set: patchData });

    res.json(campaign._id);
  } catch (err) {
    res.status(500).send('Server Error: ' + err.message);
  }
});

// @route   DELETE api/campaigns/:campaignId/cards/:cardId
// @desc    Delete a card
// @access  Admin
router.delete('/:cardId', admin, async (req, res) => {
  try {
    let card = await Card.findById(req.params.cardId);

    // If no card was found
    if (!card) return res.status(404).json({ msg: 'Card not found' });

    card.remove();

    res.json({ msg: 'Card removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
