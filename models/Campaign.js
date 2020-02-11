const mongoose = require('mongoose');

const CampaignSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateLastModified: {
    type: Date,
    default: Date.now
  },
  imageUrl: { type: String, default: 'https://place-hold.it/200x200' },
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      isAdmin: { type: Boolean, default: false }
    }
  ],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chapters' }],
  hidden: {
    type: Boolean,
    default: false
  },
  wiki: [
    {
      name: String,
      tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }]
    }
  ]
});

module.exports = mongoose.model('campaign', CampaignSchema);
