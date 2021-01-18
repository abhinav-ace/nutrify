const router = require('express').Router();
const mealModel = require('../model/meal.js');

router.post('/addMeal', mealModel.addMeal);
router.post('/deleteMeal', mealModel.deleteMeal);
router.post('/editMeal', mealModel.editMeal);

module.exports = router;