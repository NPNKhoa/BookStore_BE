const BorrowingRecordService = require('../Services/BorrowingRecordService');

class BorrowingRecordController {
  async createBorrowingRecord(req, res) {
    try {
      const record = await BorrowingRecordService.createBorrowingRecord(
        req.body
      );
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBorrowingRecordById(req, res) {
    const { id } = req.params;
    try {
      const record = await BorrowingRecordService.getBorrowingRecordById(id);
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllBorrowingRecords(req, res) {
    try {
      const records = await BorrowingRecordService.getAllBorrowingRecords();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBorrowingRecord(req, res) {
    const { id } = req.params;
    try {
      const record = await BorrowingRecordService.updateBorrowingRecord(
        id,
        req.body
      );
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBorrowingRecord(req, res) {
    const { id } = req.params;
    try {
      const record = await BorrowingRecordService.deleteBorrowingRecord(id);
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BorrowingRecordController();
