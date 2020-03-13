const express = require('express');
const router = require('express-promise-router')();
const LoginController = require('../controllers/login');
const passport = require('passport');
const passportConf = require('../passport');
const {validateBody,schemas} = require('../helpers/routesHelper');

const passportSignIn = passport.authenticate('local',{session:false})
const passportJWT = passport.authenticate('jwt',{session:false})

router.route('/signup')
    .post(LoginController.signUp);

router.route('/secret')
    .get(passportJWT,LoginController.secert);


router.route('/signin')
    .post(validateBody(schemas.autoSchema),passportSignIn,LoginController.signIn);

module.exports = router;