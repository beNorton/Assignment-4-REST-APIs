const express = require('express');
const router = express.Router();

const mealService = require('../../services/mealService');

// routing code goes here
 
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



// export our router
module.exports = router;