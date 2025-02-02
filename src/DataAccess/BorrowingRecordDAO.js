const BorrowingRecord = require('../Models/BorrowingRecord');

class BorrowingRecordDAO {
  async create(borrowingData) {
    const borrowingRecord = new BorrowingRecord(borrowingData);
    return await borrowingRecord.save();
  }

  async getById(id) {
    return await BorrowingRecord.findById(id)
      .populate('readerId')
      .populate('bookId');
  }

  async getAll() {
    return await BorrowingRecord.find().populate('readerId').populate('bookId');
  }

  async update(id, updateData) {
    console.log(updateData);
    return await BorrowingRecord.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  async delete(id) {
    return await BorrowingRecord.findByIdAndDelete(id);
  }
}

module.exports = new BorrowingRecordDAO();
