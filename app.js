var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var multer = require('multer');

// add db
var mongo = require('mongo');
var mongoose = require('mongoose');
var mongodbUri = require('mongodb-uri');

var url = "mongodb://heroku_app36019089:e1gm3it25dp8vfm1qr7a4gvul9@ds061651.mongolab.com:61651/heroku_app36019089"
var mongoUrl = mongodbUri.formatMongoose(url);

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', function(error){
  console.log('db error:', error);
});
db.on('open', function(){
  console.log('db is open');
});

//connect to index.js
var routes = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//use locals from base directory
app.locals.basedir = path.join(__dirname, 'public');

//uploading photos
app.use(multer({ dest: './uploads/' }));

// Make db accessible to router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', routes);
app.use('/users', users);

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


module.exports = app;
