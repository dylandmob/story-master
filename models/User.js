const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    default: 'https://place-hold.it/200x200'
  },
  campaigns: [
    {
      campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'campaigns'
      },
      isAdmin: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model('user', UserSchema);
