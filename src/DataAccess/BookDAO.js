const Book = require('../Models/Book');

class BookDAO {
  async create(bookData) {
    const book = new Book(bookData);
    return await book.save();
  }

  async findById(id) {
    return await Book.findById(id).populate('publisherId');
  }

  async update(id, updateData) {
    return await Book.findByIdAndUpdate(id, updateData, { new: true }).populate(
      'publisherId'
    );
  }

  async delete(id) {
    return await Book.findByIdAndDelete(id);
  }

  async findAll() {
    return await Book.find().populate('publisherId');
  }

  async findAvailable() {
    return await Book.find({ quantity: { $gt: 0 } }).populate('publisherId');
  }
}

module.exports = new BookDAO();
