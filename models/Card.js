const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
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
  photoUrl: { type: String, default: 'https://place-hold.it/200x200' },
  privateDescription: String
});

module.exports = mongoose.model('card', CardSchema);
