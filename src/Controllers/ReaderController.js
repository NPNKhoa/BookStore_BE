const ReaderService = require('../Services/ReaderService');
const { validateReader } = require('../Validators/ReaderValidator');
const { validateObjectId } = require('../Validators/commonValidators');
const handleError = require('../handleError');

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
    const { error: idError } = validateObjectId(req.params.readerId);

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
    const { error: idError } = validateObjectId(req.params.readerId);

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
    const { error: idError } = validateObjectId(req.params.readerId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      await ReaderService.deleteReader(req.params.readerId);
      res.status(204);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllReaders(req, res) {
    try {
      const readers = await ReaderService.getAllReaders();
      res.status(200).json(readers);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new ReaderController();
