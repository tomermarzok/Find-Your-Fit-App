const express = require('express');
const router = require('express-promise-router')();
const TraineeController = require('../controllers/trainers');


router.route('/')
    .get(TraineeController.getAllTrainers)
    .post(TraineeController.newTrainee)

router.route('/:traineeId')
    .get(TraineeController.getTrainee)
    .put(TraineeController.replaceTrainee)
    .patch(TraineeController.updateTrainee)
    .delete(TraineeController.deleteTrainee)

module.exports = router;