var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var kue = require('kue')  
const queue = kue.createQueue();

const contactProcess = require('./job_consumer/contact');

// comment out var models and move require to individual models in ./models
// var models = require('./models/models');
var app = express();

module.exports = { app, queue }

// bring in the routes for implementation in REST routes
var indexRoute = require('./routes/index.js');
//var users = require('./routes/users');
var contactRoute = require('./routes/contact.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('random', Math.floor(Math.random() *9)+0);

// these are app configurations
// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongo setup and mongoose in ./models/models.js 
// mongo and mongoose setup lives in models

// REST routes
app.use('/', indexRoute);
//app.use('/users', users);
app.use('/contact', contactRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
