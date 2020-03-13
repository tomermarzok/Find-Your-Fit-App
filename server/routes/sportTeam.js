const express = require('express');
const router = require('express-promise-router')();
const TeamController = require('../controllers/sportTeam');


router.route('/')
    .post(TeamController.newSportTeam)
    .get(TeamController.getAllTeam)

router.route('/sign-to-team')
    .post(TeamController.signToTeam)
    .delete(TeamController.unSignTeam)

router.route('/:teamId')
    .delete(TeamController.deleteTeam)

module.exports = router;