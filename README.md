# Assignment 4: Rest APIs

## Overview

This application is used to track the food that you eat durning the day. The home page lists all of your
entries that have been looged. You can click on the list to meal to see more details. On the home page you
can log your meals by filling out the form. Select the meal, enter a description, and provide a link to an
image of your food. Click the "Add Food" button and you'll see this added to your list of entries.

In this release of the application data is saved into a MongoDB database. Users now have the ability to edit
and delete an entry. When food is logged each line of the description is treated like an array.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

## Deplpyment Link

[assignment-3-crud-in-express-with-mongodb.onrender.com/](https://assignment-3-crud-in-express-with-mongodb.onrender.com)

## CHAT PROMPT to build UPDATE/DELETE functionality

Help me add edit and delete functionality to my Express + MongoDB meal tracker in assignment-3/Assignment-3-CRUD-in-Express-with-MongoDB using plain POST routes only. I want both actions available from the single meal details page. Please first inspect the existing routes, views, and Mongoose model, then implement the feature end-to-end with minimal clean changes. Add an edit form on the meal details page that submits with POST and updates the existing meal in MongoDB, and add a delete form/button on that same page that submits with POST and removes the meal from the database. Handle invalid or missing meal IDs gracefully, keep redirects sensible after update/delete, and preserve the current app structure and style. After making the changes, briefly explain what routes and view changes you added.
