var trumpet = require('trumpet');
var through2 = require('through2');

var tr = trumpet();
process.stdin.pipe(tr);
var stream = tr.select('.loud').createStream();

stream.pipe(through2( function (item, _, next){
  this.push(item.toString().toUpperCase());
  next();
})).pipe(stream);

tr.pipe(process.stdout);
