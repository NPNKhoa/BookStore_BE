const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  PUBLISHER_NAME: {
    type: String,
    required: true,
    trim: true,
  },
  ADDRESS: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Publisher', publisherSchema);
