const express = require('express');
const router = express.Router();
// const Meal = require('../models/mealModel');

const mealService = require('../services/mealService');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // find all the meals in the database
    // future enhancment will only find the meals that match with Today.

    // const meals = await Meal.find();

    const meals = await mealService.list();
    res.render('index', {
      title: 'What Did I Eat Today?',
      meals: meals.map((meal) => ({
        id: meal._id.toString(),
        meal: meal.mealname,
      })),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
