const router = require('express').Router();
const calorieModel = require('../model/calorie.js');
router.get('/fetchCalorie', calorieModel.fetchCalorie);
module.exports = router;