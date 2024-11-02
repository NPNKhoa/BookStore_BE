const BorrowingRecordService = require('../Services/BorrowingRecordService');
const handleError = require('../Utils/handleError');
const {
  validateBorrowingRecord,
} = require('../Validators/BorrowingRecordValidator');
const { validateObjectId } = require('../Validators/commonValidators');

class BorrowingRecordController {
  async createBorrowingRecord(req, res) {
    const { error } = validateBorrowingRecord(req.body);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const record = await BorrowingRecordService.createBorrowingRecord(
        req.body
      );

      res.status(201).json(record);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getBorrowingRecordById(req, res) {
    const { id } = req.params;

    const { error } = validateObjectId(id);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const record = await BorrowingRecordService.getBorrowingRecordById(id);
      if (!record) return res.status(404).json({ error: 'Record not found' });
      res.status(200).json(record);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllBorrowingRecords(_, res) {
    try {
      const records = await BorrowingRecordService.getAllBorrowingRecords();
      res.status(200).json(records);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateBorrowingRecord(req, res) {
    const { error } = validateBorrowingRecord(req.body);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    const { id } = req.params;

    const { error: idError } = validateObjectId(id);

    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      const record = await BorrowingRecordService.updateBorrowingRecord(
        id,
        req.body
      );

      if (!record) return res.status(404).json({ error: 'Record not found' });

      res.status(200).json(record);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteBorrowingRecord(req, res) {
    const { id } = req.params;

    const { error } = validateObjectId(id);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const record = await BorrowingRecordService.deleteBorrowingRecord(id);

      if (!record) return res.status(404).json({ error: 'Record not found' });

      res.status(204);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new BorrowingRecordController();
