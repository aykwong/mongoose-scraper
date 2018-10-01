var createError = require('http-errors');
var express = require('express');
var logger = require("morgan");
var path = require('path');
var mongoose = require("mongoose");

// mongoose connect
mongoose.connect("mongodb://localhost/mongooseScraper", { useNewUrlParser: true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var PORT = 8080;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// Start the server
app.listen(PORT, function() {
  console.log("App running on http://localhost:" + PORT + "!");
});
