const mongoose = require('mongoose');

const BorrowingRecordSchema = new mongoose.Schema(
  {
    READER_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reader',
      required: true,
    },
    BOOK_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    BORROW_DATE: { type: Date, required: true },
    RETURN_DATE: { type: Date },
  },
  {
    timestamps: true,
  }
);

BorrowingRecordSchema.index(
  { READER_ID: 1, BOOK_ID: 1, BORROW_DATE: 1 },
  { unique: true }
);

module.exports = mongoose.model('BorrowingRecord', BorrowingRecordSchema);
