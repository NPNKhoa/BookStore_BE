const Reader = require('../Models/Reader');

class ReaderDAO {
  async create(readerData) {
    const reader = new Reader(readerData);
    return await reader.save();
  }

  async findById(id) {
    return await Reader.findById(id);
  }

  async update(id, updateData) {
    return await Reader.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Reader.findByIdAndDelete(id);
  }

  async findAll() {
    return await Reader.find();
  }

  async findByPhone(phone) {
    return await Reader.findOne({ phone });
  }
}

module.exports = new ReaderDAO();
