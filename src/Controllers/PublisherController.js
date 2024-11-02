const PublisherService = require('../Services/PublisherService');
const { validatePublisher } = require('../Validators/PublisherValidator');
const { validateObjectId } = require('../Validators/commonValidators');
const handleError = require('../handleError');

class PublisherController {
  async createPublisher(req, res) {
    const { error } = validatePublisher(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const publisher = await PublisherService.createPublisher(req.body);
      res.status(201).json(publisher);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getPublisherById(req, res) {
    const { error: idError } = validateObjectId(req.params.publisherId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      const publisher = await PublisherService.getPublisherById(
        req.params.publisherId
      );
      res.status(200).json(publisher);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updatePublisher(req, res) {
    const { error: idError } = validateObjectId(req.params.publisherId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    const { error } = validatePublisher(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const publisher = await PublisherService.updatePublisher(
        req.params.publisherId,
        req.body
      );
      res.status(200).json(publisher);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deletePublisher(req, res) {
    const { error: idError } = validateObjectId(req.params.publisherId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      await PublisherService.deletePublisher(req.params.publisherId);
      res.status(204);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllPublishers(req, res) {
    try {
      const publishers = await PublisherService.getAllPublishers();
      res.status(200).json(publishers);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new PublisherController();
