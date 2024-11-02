const Joi = require('joi');

const borrowingRecordSchema = Joi.object({
  READER_ID: Joi.string().required().messages({
    'string.empty': 'Reader ID is required',
  }),
  BOOK_ID: Joi.string().required().messages({
    'string.empty': 'Book ID is required',
  }),
  BORROW_DATE: Joi.date().required().messages({
    'date.base': 'Borrow Date must be a valid date',
    'any.required': 'Borrow Date is required',
  }),
  RETURN_DATE: Joi.date()
    .optional()
    .allow(null)
    .greater(Joi.ref('BORROW_DATE'))
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
