var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');

// express router for routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var switchRouter = require('./routes/switches');
var documentationRouter = require('./routes/documentation');

// initialize express app
var app = express();

// inporting .env file for credentials
dotenv.config();

// server credentials for mongoDB
const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const URL = "mongodb+srv://"+userName+":"+password+"@cluster0.vrici.mongodb.net/Mechanical_switches?retryWrites=true&w=majority";

// set up handlebars to use layout folder
app.engine('hbs', exphbs({
  extname: '.hbs', layoutsDir: __dirname + '/views/layouts'
}));
// set up view engine to use handlebars
app.set('view engine', 'hbs');

app.use(logger('dev'));
// import express json to parse and repond to json requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// connect to database
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    console.log("Connected to database, web API is online");
  })
  .catch((err) => {
    console.log("There was some sort of error in connecting to the database:");
    console.log(err);
  });

// set up routes with the appropriate routers
app.use('/users', usersRouter);
app.use('/switches', switchRouter);
app.use('/documentation', documentationRouter);
app.use('/', indexRouter);

module.exports = app;
