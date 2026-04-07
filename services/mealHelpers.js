const mongoose = require('mongoose');

const mealService = require('./mealService');

function parseDescription(description) {
  if (Array.isArray(description)) {
    return description
      .map((line) => String(line).trim())
      .filter((line) => line.length > 0);
  }

  if (typeof description === 'string') {
    return description
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  return [];
}

async function findMealById(mealId) {
  if (!mongoose.isValidObjectId(mealId)) {
    return null;
  }

  return mealService.find(mealId);
}

module.exports = { parseDescription, findMealById };
