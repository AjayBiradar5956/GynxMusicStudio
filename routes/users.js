const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.post('/create', usersController.create);
router.use('/favorite', passport.checkAuthentication, require('./favorite'));
router.use('/artist', passport.checkAuthentication, require('./artist'));
router.use('/queue', passport.checkAuthentication, require('./queue'));
router.use('/mc', passport.checkAuthentication, require('./mc'));


router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/sign-out', usersController.destroySession);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

//Google Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }), usersController.createSession);

module.exports = router;