//duplexer2 does not work for some reason
var duplexer = require('duplexer');
var through = require('through2').obj;
var combine = require('stream-combiner');
var zlib = require('zlib');

module.exports = function () {
  var booksByGenre = {
    name : '',
    books : []
  };
  var finalString = '';
  var not_first = false;
  var inStream = through(write, end);
  function write (item, _, next) {
    var all = item.toString().split('\n');
    all.forEach (function(item, index){
      if (item.toString().length > 0){
        var parsed = JSON.parse(item);
        if (parsed.type == 'genre'){
          if (not_first)
            finalString += JSON.stringify(booksByGenre) + '\n';
            if (!not_first)
              not_first = true;
          booksByGenre.name = parsed.name;
          booksByGenre.books = [];
        } else{
          booksByGenre.books.push(parsed.name);
        }
      }
    });
    next();
  }
  function end (done) {
    finalString += JSON.stringify(booksByGenre);
    this.push(finalString);
    done();
  }
  return combine(inStream, zlib.createGzip());
};
