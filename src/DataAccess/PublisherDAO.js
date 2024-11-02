const Publisher = require('../Models/Publisher');

class PublisherDAO {
  async create(publisherData) {
    const publisher = new Publisher(publisherData);
    return await publisher.save();
  }

  async findById(id) {
    return await Publisher.findById(id);
  }

  async findByName(publisherName) {
    return await Publisher.findOne({ publisherName });
  }

  async update(id, updateData) {
    return await Publisher.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Publisher.findByIdAndDelete(id);
  }

  async findAll() {
    return await Publisher.find();
  }
}

module.exports = new PublisherDAO();
