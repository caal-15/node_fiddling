//rquired modules
var mongoose = require('mongoose');
//Schema definition
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  role: String
});
//export the model
module.exports = mongoose.model('user', userSchema);
