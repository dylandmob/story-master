const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  body: {
    type: String,
    required: true
  },
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

module.exports = mongoose.model('note', NoteSchema);
