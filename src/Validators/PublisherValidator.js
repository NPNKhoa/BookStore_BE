const Joi = require('joi');

const publisherSchema = Joi.object({
  PUBLISHER_NAME: Joi.string().required().messages({
    'string.empty': 'Publisher Name is required',
  }),
  ADDRESS: Joi.string().optional(),
});

module.exports = {
  validatePublisher(data) {
    return publisherSchema.validate(data, { abortEarly: false });
  },
};
