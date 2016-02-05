//duplexer2 does not work for some reason
var duplexer = require('duplexer');
var through = require('through2').obj;

module.exports = function (counter) {
  var count = {};
  var inStream = through(write, end);
  function write (item, _, next) {
    if (item.country in count)
      count[item.country]++;
    else
      count[item.country] = 1;
    next();
  }
  function end (done) {
    counter.setCounts(count);
    done();
  }
  return duplexer(inStream, counter);
};
