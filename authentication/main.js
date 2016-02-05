//required modules
var express = require('express');
var morgan = require('morgan');
var passport = require('passport');
var passportLocal = require('passport-local');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//Create app
var app = express();

//Connect to DB
var db = mongoose.connect('mongodb://localhost/test-user');

//Configure passport
require('./config/passport.js')(passport);

//set up express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'hsfkgakuwuagygwshsh'}));
app.use(passport.initialize());
app.use(passport.session());

//Configure routes
require('./routes/routes.js')(app, passport);

//start server
app.listen(3000);
console.log('Started on 3000!');
