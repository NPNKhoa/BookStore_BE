const express = require('express');
const StatisticController = require('../Controllers/StatisticController');

const router = express.Router();

router.get('/top-books', StatisticController.getTopBooks);

router.get('/top-readers', StatisticController.getTopReaders);

router.get('/monthly', StatisticController.getMonthlyStat);

module.exports = router;
