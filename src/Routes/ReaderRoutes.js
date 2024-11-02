const express = require('express');
const ReaderController = require('../Controllers/ReaderController');

const router = express.Router();

router.post('/', ReaderController.createReader);

router.get('/', ReaderController.getAllReaders);

router.get('/:readerId', ReaderController.getReaderById);

router.put('/:readerId', ReaderController.updateReader);

router.delete('/:readerId', ReaderController.deleteReader);

module.exports = router;
