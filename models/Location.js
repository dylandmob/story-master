const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  photoUrl: { type: String, default: 'https://place-hold.it/600x300' },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateLastModified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('location', LocationSchema);
