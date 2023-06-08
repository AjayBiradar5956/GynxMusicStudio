const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist_controller');

router.get('/', artistController.launch);

module.exports = router;