const express = require('express');
const router = express.Router();

const mealService = require('../services/mealService');
const { parseDescription, findMealById } = require('../services/mealHelpers');

// render this when no meal found
function renderMealNotFound(res) {
  return res.status(404).render('meal', {
    title: 'No meal found',
    meal: null
  });
}

/* GET single meal by id. with Mongoose */
router.get('/:mealid', async function(req, res, next) {
  let meal = null;
  try {
    meal = await findMealById(req.params.mealid);
  } catch (err) {
    console.error("Error getting meal from our database", err);
    return next(err);
  }
  // no meal found
  if (!meal) {
    return renderMealNotFound(res);
  }
  //render the meal
  res.render('meal', {
    title: meal.mealname,
    meal: meal
  });
});

/* POST meal updates using Mongo. */
router.post('/:mealid/edit', async function(req, res, next) {
  let meal = null;
  try {
    meal = await findMealById(req.params.mealid);
  } catch (err) {
    console.error("Error getting meal from our database", err);
    return next(err);
  }

  if (!meal) {
    return renderMealNotFound(res);
  }

  const updates = {
    mealname: req.body.mealname,
    description: parseDescription(req.body.description),
    plateImageURL: req.body.plateImageURL,
  };

  try {
    await mealService.update(req.params.mealid, updates, {
      runValidators: true,
    });
  } catch (err) {
    console.error("Error updating meal in database:", err);
    return next(err);
  }

  res.redirect(`/meals/${meal._id}`);
});

/* POST meal delete using Mongo. */
router.post('/:mealid/delete', async function(req, res, next) {
  let meal = null;
  try {
    meal = await findMealById(req.params.mealid);
  } catch (err) {
    console.error("Error getting meal from our database", err);
    return next(err);
  }

  if (!meal) {
    return renderMealNotFound(res);
  }

  try {
    await mealService.remove(req.params.mealid);
  } catch (err) {
    console.error("Error deleting meal from database:", err);
    return next(err);
  }

  res.redirect('/');
});

/* POST new meal using Mongo. */
router.post('/', async function(req, res, next) { 
  const mealData  = {
    mealname: new Date().toDateString() + ": " + req.body.mealType,
    plateImageURL: req.body.plateImageURL,
    // call helper function to split description.
    description: parseDescription(req.body.description),
  }  
  console.log(req.file);

  try{
    await mealService.create(mealData);
  }catch(err){
    console.error("Error saving meal to database:", err);
    return next(err);
  }
  // Redirect to home page
  res.redirect('/');
});


module.exports = router;
