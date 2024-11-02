const ReaderDAO = require('../DataAccess/ReaderDAO');
const { NotFoundError, ConflictError } = require('../Error.js');

class ReaderService {
  async createReader(readerData) {
    const existingReaders = ReaderDAO.findByPhone(readerData.phone);

    if (existingReaders) {
      throw new ConflictError('Reader with phone number already exists');
    }
    return await ReaderDAO.create(readerData);
  }

  async getReaderById(id) {
    const reader = await ReaderDAO.findById(id);
    if (!reader) {
      throw new NotFoundError('Reader not found');
    }
    return reader;
  }

  async updateReader(id, updateData) {
    const reader = await ReaderDAO.update(id, updateData);
    if (!reader) {
      throw new NotFoundError('Reader not found');
    }
    return reader;
  }

  async deleteReader(id) {
    const reader = await ReaderDAO.delete(id);
    if (!reader) {
      throw new NotFoundError('Reader not found');
    }
    return reader;
  }

  async getAllReaders() {
    return await ReaderDAO.findAll();
  }
}

module.exports = new ReaderService();
