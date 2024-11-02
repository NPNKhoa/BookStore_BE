const express = require('express');
const PublisherController = require('../Controllers/PublisherController');

const router = express.Router();

router.post('/', PublisherController.createPublisher);

router.get('/', PublisherController.getAllPublishers);

router.get('/:publisherId', PublisherController.getPublisherById);

router.put('/:publisherId', PublisherController.updatePublisher);

router.delete('/:publisherId', PublisherController.deletePublisher);

module.exports = router;
