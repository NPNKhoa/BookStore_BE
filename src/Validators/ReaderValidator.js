const Joi = require('joi');

const readerSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),
  dateOfBirth: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required',
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': 'Gender must be one of Male, Female, or Other',
    'any.required': 'Gender is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
  }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must be a 10-digit number',
    }),
});

module.exports = {
  validateReader(data) {
    return readerSchema.validate(data, { abortEarly: false });
  },
};
