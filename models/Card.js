const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'campaigns' },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateLastModified: {
    type: Date,
    default: Date.now
  },
  description: String,
  name: {
    type: String,
    required: true
  },
  imageUrl: { type: String, default: 'https://place-hold.it/200x200' },
  privateDescription: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
  hidden: { type: Boolean, default: false }
});

module.exports = mongoose.model('card', CardSchema);
