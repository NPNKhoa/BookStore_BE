const Joi = require('joi');
const mongoose = require('mongoose');

module.exports = {
  validateObjectId(id) {
    return Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid phase ID');
      }

      return value;
    });
  },
};
