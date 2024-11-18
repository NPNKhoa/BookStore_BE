const ReaderService = require('../Services/ReaderService');
const { validateReader } = require('../Validators/ReaderValidator');
const { validateObjectId } = require('../Validators/commonValidators');
const handleError = require('../Utils/handleError');
const { NotFoundError } = require('../Utils/Error');

class ReaderController {
  async createReader(req, res) {
    const { error } = validateReader(req.body);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const reader = await ReaderService.createReader(req.body);

      res.status(201).json(reader);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getReaderById(req, res) {
    const idError = validateObjectId(req.params.readerId);

    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      const reader = await ReaderService.getReaderById(req.params.readerId);

      res.status(200).json(reader);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateReader(req, res) {
    const idError = validateObjectId(req.params.readerId);

    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    const { error } = validateReader(req.body);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const reader = await ReaderService.updateReader(
        req.params.readerId,
        req.body
      );

      res.status(200).json(reader);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteReader(req, res) {
    const idError = validateObjectId(req.params.readerId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      await ReaderService.deleteReader(req.params.readerId);
      res.sendStatus(204);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllReaders(_, res) {
    try {
      const readers = await ReaderService.getAllReaders();

      if (Array.isArray(readers) && readers.length === 0) {
        throw new NotFoundError('Can not found any readers');
      }

      res.status(200).json(readers);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new ReaderController();
