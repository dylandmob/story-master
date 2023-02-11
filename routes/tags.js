const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { check, validationResult } = require('express-validator');

const Tag = require('../models/Tag');
const Card = require('../models/Card');
const Campaign = require('../models/Campaign');
const isAdmin = require('../middleware/isAdmin');

// @route   GET api/campaigns/:campaignId/tags
// @desc    Gets the campaign's tags
// @access  Private
router.get('/', isAdmin, async (req, res) => {
  try {
    const tags = await Tag.find({ campaign: req.params.campaignId }).sort({
      dateLastModified: -1,
    });

    res.json(tags);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/campaigns/:campaignId/tags
// @desc    Create a new tag
// @access  Admin
router.post(
  '/',
  [admin, [check('name', "Tag's name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, privateDescription, imageUrl } = req.body;

    try {
      const newTag = new Tag({
        campaign: req.params.campaignId,
        name,
        description,
        privateDescription,
        imageUrl,
      });

      const tag = await newTag.save();

      res.json(tag);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// @route   PATCH api/campaigns/:campaignId/tags/:tagId
// @desc    Edit a tag
// @access  Admin
router.patch('/:tagId', admin, async (req, res) => {
  const { name, description, privateDescription, imageUrl } = req.body;

  try {
    let tag = await Tag.findById(req.params.tagId);

    // If no tag was found
    if (!tag) return res.status(404).json({ msg: 'Tag not found' });

    // Normalize the data
    let patchData = {};
    if (name) patchData.name = name;
    if (description) patchData.description = description;
    if (privateDescription) patchData.privateDescription = privateDescription;
    if (imageUrl) patchData.imageUrl = imageUrl;

    // Edit the tag
    await tag.updateOne({ $set: patchData });

    res.json(tag._id);
  } catch (err) {
    res.status(500).send('Server Error: ' + err.message);
  }
});

// @route   DELETE api/campaigns/:campaignId/tags/:tagId
// @desc    Delete a tag
// @access  Admin
router.delete('/:tagId', admin, async (req, res) => {
  try {
    let tag = await Tag.findById(req.params.tagId);

    // If no campaign was found
    if (!tag) return res.status(404).json({ msg: 'Tag not found' });

    // Remove tag from wiki if in wiki
    let campaign = await Campaign.findById(req.params.campaignId);
    let wiki = campaign.wiki.filter(
      (tab) => tab.toString() !== req.params.tagId
    );

    if (wiki.length !== campaign.wiki.length)
      await campaign.updateOne({ $set: { wiki } });

    // Remove tags from cards with tag
    let filterParmas = {
      campaign: req.params.campaignId,
      tags: { $in: tag },
    };

    const cards = await Card.find(filterParmas);

    cards.map((card) => {
      // Delete cards that only have this tag and no other tags
      if (card.tags.length === 1) {
        card.remove();
      } else {
        card.updateOne({ $pull: { _id: tag._id } });
      }
    });

    tag.remove();

    res.json({ msg: 'Tag removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
