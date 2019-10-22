const express = require('express');
const tagRouter = express.Router({ mergeParams: true });
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Tag = require('../models/Tag');

// @route   GET api/campaigns/:campaignId/tags
// @desc    Gets the campaign's tags
// @access  Private
tagRouter.get('/', auth, async (req, res) => {
  try {
    const tags = await Tag.find({ campaign: req.params.campaignId }).sort({
      dateLastModified: -1
    });

    res.json(tags);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/campaigns/:campaignId/tags
// @desc    Create a new tag
// @access  Admin
tagRouter.post(
  '/',
  [
    auth,
    [
      check('name', "Tag's name is required")
        .not()
        .isEmpty()
    ]
  ],
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
        imageUrl
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
tagRouter.patch('/:tagId', auth, async (req, res) => {
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

    // Edit the campaign
    await tag.updateOne({ $set: patchData });

    res.json(campaign._id);
  } catch (err) {
    res.status(500).send('Server Error: ' + err.message);
  }
});

// @route   DELETE api/campaigns/:campaignId/tags/:tagId
// @desc    Delete a tag
// @access  Admin
tagRouter.delete('/:tagId', auth, async (req, res) => {
  try {
    let tag = await Tag.findById(req.params.tagId);

    // If no campaign was found
    if (!tag) return res.status(404).json({ msg: 'Tag not found' });

    tag.remove();

    res.json({ msg: 'Campaign removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = tagRouter;
