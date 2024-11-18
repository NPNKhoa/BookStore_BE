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
  { readerId: 1, bookId: 1, borrowDate: 1 },
  { unique: true }
);

module.exports = mongoose.model('BorrowingRecord', BorrowingRecordSchema);
