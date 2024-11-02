const BorrowingRecordDAO = require('../DataAccess/BorrowingRecordDAO');

class BorrowingRecordService {
  async createBorrowingRecord(borrowingData) {
    return await BorrowingRecordDAO.create(borrowingData);
  }

  async getBorrowingRecordById(id) {
    return await BorrowingRecordDAO.getById(id);
  }

  async getAllBorrowingRecords() {
    return await BorrowingRecordDAO.getAll();
  }

  async updateBorrowingRecord(id, updateData) {
    return await BorrowingRecordDAO.update(id, updateData);
  }

  async deleteBorrowingRecord(id) {
    return await BorrowingRecordDAO.delete(id);
  }
}

module.exports = new BorrowingRecordService();
