const PublisherDAO = require('../DataAccess/PublisherDAO');
const { NotFoundError, ConflictError } = require('../Utils/Error');

class PublisherService {
  async createPublisher(publisherData) {
    const existingPublisher = await PublisherDAO.findByName(
      publisherData.publisherName
    );

    if (existingPublisher) {
      throw new ConflictError('Publisher already exists');
    }

    return await PublisherDAO.create(publisherData);
  }

  async getPublisherById(id) {
    const publisher = await PublisherDAO.findById(id);
    if (!publisher) {
      throw new NotFoundError('Publisher not found');
    }
    return publisher;
  }

  async updatePublisher(id, updateData) {
    const publisher = await PublisherDAO.update(id, updateData);
    if (!publisher) {
      throw new NotFoundError('Publisher not found');
    }
    return publisher;
  }

  async deletePublisher(id) {
    const publisher = await PublisherDAO.delete(id);

    if (!publisher) {
      throw new NotFoundError('Publisher not found');
    }

    return publisher;
  }

  async getAllPublishers() {
    return await PublisherDAO.findAll();
  }
}

module.exports = new PublisherService();
