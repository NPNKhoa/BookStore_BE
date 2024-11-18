const Joi = require('joi');

const publisherSchema = Joi.object({
  publisherName: Joi.string().required().messages({
    'string.empty': 'Publisher Name is required',
  }),
  address: Joi.string().optional(),
});

const updatePublisherSchema = Joi.object({
  publisherName: Joi.string().optional(),
  address: Joi.string().optional(),
});

module.exports = {
  validatePublisher(data) {
    return publisherSchema.validate(data, { abortEarly: false });
  },
  validateUpdatePublisher(data) {
    return updatePublisherSchema.validate(data, { abortEarly: false });
  },
};
