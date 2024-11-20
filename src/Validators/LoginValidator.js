const Joi = require('joi');

const loginSchema = Joi.object({
  phone: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
  }),
});

module.exports = {
  validateLogin(data) {
    return loginSchema.validate(data, { abortEarly: false });
  },
};
