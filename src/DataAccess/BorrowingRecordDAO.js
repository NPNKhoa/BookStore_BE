const BorrowingRecord = require('../Models/BorrowingRecord');

class BorrowingRecordDAO {
  async create(borrowingData) {
    const borrowingRecord = new BorrowingRecord(borrowingData);
    return await borrowingRecord.save();
  }

  async getById(id) {
    return await BorrowingRecord.findById(id);
  }

  async getAll() {
    return await BorrowingRecord.find()
      .populate('READER_ID')
      .populate('BOOK_ID');
  }

  async update(id, updateData) {
    return await BorrowingRecord.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  async delete(id) {
    return await BorrowingRecord.findByIdAndDelete(id);
  }
}

module.exports = new BorrowingRecordDAO();
