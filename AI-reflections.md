# AI Reflections

While working through this assignment I started making all the updates by hand following along
with the lecture and the materials in the Modules. After creating a new service and updating
my routes to use that instead, somewhere in refactoring the meals route I lost my place and was
spending a lot of time making sure I was updating each method. 

So I ask the following.

`In assighnment-4 I've started to replace the mealModel with the mealService can you finish refactoring meal.js for me and let me know what you did?`

It made all the changes and showed me a diff file that I could review to make sure I understood what was happening. That was very helpful. I ran some test and it worked great!

At the start of this assignment I realized something that I didn't catch in the previous assignment. I noticed that my code was using 'var' instead of 'const' in a lot of places. I don't remember that, I wonder if the AI changed them to 'var' and I just didn't notice. A good reminder to check more throughly.

I also asked for some help with the api routes with the following prompt.

`Can you look at my meals route and then complete the missing methods find, create, update and delete in api-meals.js? Make sure to include the appropriate http status codes in the responses.`

This worked great as well it even used the same helper functions that I wrote to confirm the id is valid and parse the description text. It also provided some tests I could run in curl which was helpful and I used them in postman.

I didn't like that my helper functions were in both api-meals.js and meals.js I asked the AI to refactor this code to add these functions into services/mealHelpers.js. It pulled out the duplicated code and update the two files to use these functions.
