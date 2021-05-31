var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var switchRouter = require('./routes/switches');
var documentationRouter = require('./routes/documentation');

var app = express();

dotenv.config();

// server credentials 
//const serverCredentials = require("./database/serverCredentials.json")
const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const URL = "mongodb+srv://"+userName+":"+password+"@cluster0.vrici.mongodb.net/Mechanical_switches?retryWrites=true&w=majority";

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('hbs', exphbs({
  extname: '.hbs', layoutsDir: __dirname + '/views/layouts'
}));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect to database
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("There was some sort of error in connecting to the database");
  })



app.use('/users', usersRouter);
app.use('/switches', switchRouter);
app.use('/documentation', documentationRouter);
app.use('/', indexRouter);

/*
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
  /*
  res.status(err.status || 500);
  res.render('error', { 
    post: {number: 25}
  });
  
  res.send("in error handler")
  
});
*/

module.exports = app;
