const mongoose = require('mongoose');

const BorrowingRecordSchema = new mongoose.Schema(
  {
    readerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reader',
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date },
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
