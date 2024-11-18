const BookDAO = require('../DataAccess/BookDAO');
const { NotFoundError, ConflictError } = require('../Utils/Error');

class BookService {
  async createBook(bookData) {
    const existingBooks = await BookDAO.findAll();
    const duplicateBook = existingBooks.find(
      (b) =>
        b.title === bookData.title &&
        b.publisherId.toString() === bookData.publisherId
    );

    if (duplicateBook) {
      throw new ConflictError(
        'Book with this title already exists for the same publisher'
      );
    }

    return await BookDAO.create(bookData);
  }

  async getBookById(id) {
    const book = await BookDAO.findById(id);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
    return book;
  }

  async updateBook(id, updateData) {
    const book = await BookDAO.update(id, updateData);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
    return book;
  }

  async deleteBook(id) {
    const book = await BookDAO.delete(id);

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    return book;
  }

  async getAllBooks() {
    return await BookDAO.findAll();
  }
}

module.exports = new BookService();
