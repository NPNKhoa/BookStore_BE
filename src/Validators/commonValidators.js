const Joi = require('joi');
const mongoose = require('mongoose');

module.exports = {
  validateObjectId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid Object ID';
    }

    return null;
  },
};
