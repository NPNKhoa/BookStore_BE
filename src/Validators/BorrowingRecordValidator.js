const Joi = require('joi');
const { validateObjectId } = require('./commonValidators');

const borrowingRecordSchema = Joi.object({
  readerId: Joi.string()
    .required()
    .custom((value, helpers) => {
      const errorMessage = validateObjectId(value);
      if (errorMessage) {
        return helpers.message(errorMessage);
      }
      return value;
    })
    .messages({
      'string.empty': 'Reader ID is required',
    }),
  bookId: Joi.string()
    .required()
    .custom((value, helpers) => {
      const errorMessage = validateObjectId(value);
      if (errorMessage) {
        return helpers.message(errorMessage);
      }
      return value;
    })
    .messages({
      'string.empty': 'Book ID is required',
    }),
  borrowDate: Joi.date().required().messages({
    'date.base': 'Borrow Date must be a valid date',
    'any.required': 'Borrow Date is required',
  }),
  returnDate: Joi.date()
    .optional()
    .allow(null)
    .greater(Joi.ref('borrowDate'))
    .messages({
      'date.base': 'Return Date must be a valid date',
      'date.greater': 'Return Date must be after Borrow Date',
    }),
});

module.exports = {
  validateBorrowingRecord(data) {
    return borrowingRecordSchema.validate(data, { abortEarly: false });
  },
};
