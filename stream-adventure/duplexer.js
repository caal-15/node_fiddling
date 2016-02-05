//INSTALL stream-combiner@1.0.2 IN stream-adventures INSTALL DIRECTORY!!!!
var duplexer2 = require('duplexer2');
var spawn = require('child_process').spawn;

module.exports = function (cmd, args){
  var child = spawn(cmd, args);
  return duplexer2(child.stdin, child.stdout);
}
