const express = require('express');
const router = express.Router();
const mcController = require('../controllers/mc_controller');

router.get('/', mcController.play);

module.exports = router;