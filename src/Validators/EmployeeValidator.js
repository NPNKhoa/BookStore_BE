const Joi = require('joi');

const employeeSchema = Joi.object({
  fullName: Joi.string().required().messages({
    'string.empty': 'Full name is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
  role: Joi.string().valid('Manager', 'Staff').required().messages({
    'any.only': 'Role must be one of Manager or Staff',
    'any.required': 'Role is required',
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
  validateEmployee(data) {
    return employeeSchema.validate(data, { abortEarly: false });
  },
};
