const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'campaigns'
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateLastModified: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: { type: String, default: 'https://place-hold.it/200x200' },
  description: String,
  privateDescription: String
});

module.exports = mongoose.model('tag', TagSchema);
