const BookService = require('../Services/BookService');
const { validateBook } = require('../Validators/BookValidator');
const { validateObjectId } = require('../Validators/commonValidators');
const handleError = require('../Utils/handleError');
const { NotFoundError } = require('../Utils/Error');

class BookController {
  async createBook(req, res) {
    const { error } = validateBook(req.body);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const book = await BookService.createBook(req.body);

      res.status(201).json(book);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getBookById(req, res) {
    const idError = validateObjectId(req.params.bookId);

    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      const book = await BookService.getBookById(req.params.bookId);

      res.status(200).json(book);
    } catch (error) {
      handleError(error, res);
    }
  }

  async updateBook(req, res) {
    const idError = validateObjectId(req.params.bookId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    const { error } = validateBook(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    try {
      const book = await BookService.updateBook(req.params.bookId, req.body);
      res.status(200).json(book);
    } catch (error) {
      handleError(error, res);
    }
  }

  async deleteBook(req, res) {
    const idError = validateObjectId(req.params.bookId);
    if (idError) {
      return res
        .status(400)
        .json({ errors: idError.details.map((e) => e.message) });
    }

    try {
      await BookService.deleteBook(req.params.bookId);
      res.sendStatus(204);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAllBooks(_, res) {
    try {
      const books = await BookService.getAllBooks();

      if (Array.isArray(books) && books.length === 0) {
        console.log('not found');
        throw new NotFoundError('Not found any books');
      }

      res.status(200).json(books);
    } catch (error) {
      handleError(error, res);
    }
  }

  async getAvailableBooks(_, res) {
    try {
      const books = await BookService.getAvailableBooks();

      if (Array.isArray(books) && books.length === 0) {
        console.log('not found');
        throw new NotFoundError('Not found any books');
      }

      res.status(200).json(books);
    } catch (error) {
      handleError(error, res);
    }
  }
}

module.exports = new BookController();
