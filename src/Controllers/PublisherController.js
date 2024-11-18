const PublisherService = require('../Services/PublisherService');
const {
  validatePublisher,
  validateUpdatePublisher,
} = require('../Validators/PublisherValidator');
const { validateObjectId } = require('../Validators/commonValidators');
const handleError = require('../Utils/handleError');

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
    const idError = validateObjectId(req.params.publisherId);

    console.log(idError);

    if (idError) {
      return res.status(400).json({ errors: idError });
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
    const idError = validateObjectId(req.params.publisherId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    const { error } = validateUpdatePublisher(req.body);
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
    const idError = validateObjectId(req.params.publisherId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      await PublisherService.deletePublisher(req.params.publisherId);
      res.sendStatus(204);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllPublishers(_, res) {
    try {
      const publishers = await PublisherService.getAllPublishers();

      if (Array.isArray(publishers) && publishers.length === 0) {
        return res.status(404).json({
          message: 'Not found publishers',
        });
      }

      res.status(200).json(publishers);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new PublisherController();
