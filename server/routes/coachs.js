const express = require('express');
const router = require('express-promise-router')();
const CoachsController = require('../controllers/coachs');



router.route('/')
    .get(CoachsController.getAllCoachs)
    .post(CoachsController.newCoach)

router.route('/:coachId')
    .get(CoachsController.getCoach)
    .put(CoachsController.replaceCoach)
    .patch(CoachsController.updateCoach)
    .delete(CoachsController.deleteCoach)

router.route('/searchCoachs')
    .post(CoachsController.searchCoachs)

    
module.exports = router;