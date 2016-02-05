var express = require('express');

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost/test', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String
});

// Mongoose Model definition
var User = mongoose.model('users', UserSchema);

// Bootstrap express
var app = express();

// URLS management

app.get('/', function (req, res) {
    res.send("<a href='/users'>Show Users</a>");
});

app.get('/users', function (req, res) {
    User.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/adduser', function (req, res) {
  var other = new User({first_name: 'carlos', last_name: 'gonzalez', email: 'c@q.v'});
  other.save(function (err, other) {
    if (err) console.error(err);
    console.log('success!');
    res.end('ok');
  });


});

app.get('/users/:email', function (req, res) {
    if (req.params.email) {
        User.find({ email: req.params.email }, function (err, docs) {
            res.json(docs);
        });
    }
});

// Start the server
app.listen(3000);
