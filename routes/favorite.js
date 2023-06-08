const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite_controller');
const passport = require('passport');

router.get('/create', favoriteController.createFav);
router.get('/createA', favoriteController.createFavA);
router.get('/favPage', passport.checkAuthentication, favoriteController.favPage);
router.get('/destroy/:id', favoriteController.destroy);
router.get('/destroyA/:id', favoriteController.destroyA);

module.exports = router;