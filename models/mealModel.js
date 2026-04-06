const mongoose = require("mongoose");

//get access to Schema constructor
const Schema = mongoose.Schema;

//create a new schema for our app
const schema = new Schema({
  mealname: {type: String, required:true},
  plateImageURL: {type: String, required:false},
  // description is an array of food item. 
  description: {type: [String], required:true},
  createdAt: {type: Date},
  updatedAt: {type: Date}
}, {timestamps: true});



// export the model with associated name and schema
module.exports = mongoose.model("Meal", schema);