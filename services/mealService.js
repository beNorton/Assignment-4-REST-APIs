const Meal = require('../models/mealModel');

// list
function list() {
  return Meal.find({});
}

// find
function find(id) {
  return Meal.findById(id);
}

// create
function create(mealData) {
  return new Meal(mealData).save();
}

// update
function update(id, updates, options = {}) {
  return Meal.findByIdAndUpdate(id, updates, options);
}

// remove
function remove(id) {
  return Meal.findByIdAndDelete(id);
} 

module.exports = { list, find, create, update, remove };