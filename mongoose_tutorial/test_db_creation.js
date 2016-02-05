var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//connect to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//what to do once database is open
db.once('open', function() {
  console.log('success connecting!');
  //schema
  var kittySchema = mongoose.Schema({
    name: String
  });
  //add a method
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
  //model
  var Kitten = mongoose.model('Kitten', kittySchema);
  //Create the document
  var fluffy = new Kitten({ name: 'fluffy' });
  //Save it to DB
  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });
  //Log all documents
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
    db.close(); // close connection
  });



});
