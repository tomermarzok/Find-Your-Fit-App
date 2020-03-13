const express = require('express');
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../passport');
const {validateParam,validateBody,schemas} = require('../helpers/routesHelper');


const passportSignIn = passport.authenticate('local',{session:false})
const passportJWT = passport.authenticate('jwt',{session:false})



//for restrict acsees to the route use the passportJWT

router.route('/')
    .get(passportJWT,UsersController.getAllUsers)
    .post(UsersController.newUser);


router.route('/:userId')
    .get(validateParam(schemas.idSchema,'userId'),UsersController.getUser)
    .put(UsersController.replaceUser)
    .patch(UsersController.updateUser)
    .delete(UsersController.deleteUser);

router.route('/:userId/coach')
    .get(UsersController.getUserCoach)
    .post(UsersController.newCoach)




module.exports = router;