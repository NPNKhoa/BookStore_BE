const Joi = require('joi');
const { validateObjectId } = require('./commonValidators');

const bookSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Book title is required',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be a positive number',
    'any.required': 'Price is required',
  }),
  quantity: Joi.number().min(0).required().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be a positive number',
    'any.required': 'Quantity is required',
  }),
  publishYear: Joi.number().integer().required().messages({
    'number.base': 'Publish year must be a number',
    'any.required': 'Publish year is required',
  }),
  publisherId: Joi.string()
    .custom((value, helpers) => {
      const error = validateObjectId(value);
      if (error) {
        return helpers.message(error);
      }
      return value;
    })
    .required()
    .messages({
      'string.empty': 'Publisher ID is required',
    }),
  author: Joi.string().optional().allow(null, '').messages({
    'string.empty': 'Origin can be empty or null',
  }),
});

module.exports = {
  validateBook(data) {
    return bookSchema.validate(data, { abortEarly: false });
  },
};
