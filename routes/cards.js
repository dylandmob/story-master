const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { check, validationResult } = require('express-validator');

const Tag = require('../models/Tag');
const Card = require('../models/Card');

// @route   GET api/campaigns/:campaignId/cards
// @desc    Gets the campaign's cards
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let filterParmas = { campaign: req.params.campaignId };
    if (req.query.tag) {
      filterParmas = { ...filterParmas, tags: { $in: req.query.tag } };
    }

    const cards = await Card.find(filterParmas).sort({
      dateLastModified: -1
    });

    res.json(cards);
  } catch (err) {
    console.error('Error', err);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/campaigns/:campaignId/cards
// @desc    Gets the campaign's cards
// @access  Private
router.get('/:cardId', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);

    res.json(card);
  } catch (err) {
    console.error('Error', err);
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
      check('name', "Card's length should be between 1 and 50").isLength({
        min: 1,
        max: 50
      }),
      check(
        'tags',
        'There needs to be at least one tag and less than 10'
      ).isArray({ min: 1, max: 10 }),
      check(
        'description',
        'Description can not be longer than 1000 characters'
      ).isLength({ max: 10000 }),
      check(
        'privateDescription',
        'Private description can not be longer than 1000 characters'
      ).isLength({ max: 10000 }),
      check(
        'imageUrl',
        'Image url can not be longer than 50 characters'
      ).isLength({ max: 50 })
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
router.patch(
  '/:cardId',
  [
    admin,
    [
      check('name', "Card's length should be between 1 and 50").isLength({
        min: 1,
        max: 50
      }),
      check(
        'tags',
        'There needs to be at least one tag and less than 10'
      ).isLength({ min: 1, max: 10 }),
      check(
        'description',
        'Description can not be longer than 1000 characters'
      ).isLength({ max: 10000 }),
      check(
        'privateDescription',
        'Private description can not be longer than 1000 characters'
      ).isLength({ max: 10000 }),
      check(
        'imageUrl',
        'Image url can not be longer than 50 characters'
      ).isLength({ max: 50 })
    ]
  ],
  async (req, res) => {
    const { name, description, privateDescription, imageUrl, tags } = req.body;

    try {
      let card = await Card.findById(req.params.cardId);

      // If no card was found
      if (!card) return res.status(404).json({ msg: 'Card not found' });

      // Normalize the data
      let patchData = {};
      if (name) patchData.name = name;
      if (description) patchData.description = description;
      if (privateDescription) patchData.privateDescription = privateDescription;
      if (imageUrl) patchData.imageUrl = imageUrl;
      if (tags) patchData.tags = tags;
      patchData.dateLastModified = Date.now();

      // Edit the card
      await card.updateOne({ $set: patchData });

      res.json(card._id);
    } catch (err) {
      res.status(500).send('Server Error: ' + err.message);
    }
  }
);

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
