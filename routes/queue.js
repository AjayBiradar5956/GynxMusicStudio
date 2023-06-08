const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queue_controller');

router.get('/create', queueController.createQue);
router.get('/destroy/:id', queueController.destroy);

module.exports = router;