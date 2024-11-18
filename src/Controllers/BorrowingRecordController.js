const BorrowingRecordService = require('../Services/BorrowingRecordService');
const { NotFoundError } = require('../Utils/Error');
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

      const response = await BorrowingRecordService.getBorrowingRecordById(
        record._id
      );

      res.status(201).json(response);
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

      if (Array.isArray(records) && records.length === 0) {
        throw new NotFoundError('Can not found any records');
      }

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

    const idError = validateObjectId(id);

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

    const error = validateObjectId(id);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const record = await BorrowingRecordService.deleteBorrowingRecord(id);

      if (!record) return res.status(404).json({ error: 'Record not found' });

      res.sendStatus(204);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new BorrowingRecordController();
