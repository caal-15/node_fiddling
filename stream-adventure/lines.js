var through2 = require('through2');
var split = require('split');
var counter = 0;
process.stdin.pipe(split()).pipe(through2(function (line, _, next){
  counter++;
  if (counter > 1)
    this.push('\n')
  if (counter % 2 === 0){
    this.push(line.toString().toUpperCase());
  } else {
    this.push(line.toString().toLowerCase());
  }
  next();
})).pipe(process.stdout);
