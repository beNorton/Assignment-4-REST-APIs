const express = require('express');
const router = express.Router();

const mealService = require('../../services/mealService');
const { parseDescription, findMealById } = require('../../services/mealHelpers');

// CORS headers for browser-based clients.
 router.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*', // Anyone can access
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS', // These are the allowed methods
    'Access-Control-Allow-Headers': 'Content-Type' // Allowed headers
  });

  // for preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// routing code 

// list
router.get('/', async (req, res, next) => {
  try {
    const mealList = await mealService.list();
    console.log('API: Found meals:', mealList);
    res.status(200).json(mealList);
  } catch (err) {
    next(err);
  }
});

// find
router.get('/:mealid', async (req, res, next) => {
  try {
    const meal = await findMealById(req.params.mealid);

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    res.status(200).json(meal);
  } catch (err) {
    next(err);
  }
});

// create
router.post('/', async (req, res, next) => {
  const mealData = {
    mealname: req.body.mealname || `${new Date().toDateString()}: ${req.body.mealType}`,
    plateImageURL: req.body.plateImageURL,
    description: parseDescription(req.body.description),
  };

  try {
    const meal = await mealService.create(mealData);
    res.status(201).json(meal);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }

    next(err);
  }
});

// update
router.put('/:mealid', async (req, res, next) => {
  try {
    const meal = await findMealById(req.params.mealid);

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    const updates = {
      mealname: req.body.mealname,
      plateImageURL: req.body.plateImageURL,
      description: parseDescription(req.body.description),
    };

    const updatedMeal = await mealService.update(req.params.mealid, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedMeal);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }

    next(err);
  }
});

// delete
router.delete('/:mealid', async (req, res, next) => {
  try {
    const meal = await findMealById(req.params.mealid);

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    await mealService.remove(req.params.mealid);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// export our router
module.exports = router;
