const mongoose = require('mongoose');

const CampaignSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateLastModified: {
    type: Date,
    default: Date.now
  },
  imageUrl: { type: String, default: 'https://place-hold.it/200x200' },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  players: [],
  chapters: [String]
});

module.exports = mongoose.model('campaign', CampaignSchema);
