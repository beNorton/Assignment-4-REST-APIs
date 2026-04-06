const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const indexRouter = require('./routes/index');
const mealsRouter = require('./routes/meals');

// require new api router for meals
const apimeals = require('./routes/api/api-meals');

// Connnect to MongoDB and Mongoose
const mongoose = require('mongoose');      

mongoose.connect(process.env.MONGODB_URI)
 .then(()=>console.log('Connected to MongoDB...'))
 .catch(err => {
    console.error('Could not connect to MongoDB...', err);
    process.exit(1);
    });   

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/meals', mealsRouter);

// add api middleware
app.use('/api/meals', apimeals);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
