const express = require('express');
const BookController = require('../Controllers/BookController');

const router = express.Router();

router.post('/', BookController.createBook);

router.get('/', BookController.getAllBooks);

router.get('/:bookId', BookController.getBookById);

router.put('/:bookId', BookController.updateBook);

router.delete('/:bookId', BookController.deleteBook);

module.exports = router;
