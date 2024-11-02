const express = require('express');
const BorrowingRecordController = require('../Controllers/BorrowingRecordController');
const router = express.Router();

router.post('/', BorrowingRecordController.createBorrowingRecord);

router.get('/:id', BorrowingRecordController.getBorrowingRecordById);

router.get('/', BorrowingRecordController.getAllBorrowingRecords);

router.put('/:id', BorrowingRecordController.updateBorrowingRecord);

router.delete('/:id', BorrowingRecordController.deleteBorrowingRecord);

module.exports = router;
