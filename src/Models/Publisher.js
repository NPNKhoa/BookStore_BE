const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  publisherName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Publisher', publisherSchema);
