var http = require('http');
var through2 = require('through2');

var server = http.createServer( function (req, res) {
  if (req.method != 'POST')
    res.end('BL');
  req.pipe(through2 (function (item, _, next){
    this.push(item.toString().toUpperCase());
    next();
  })).pipe(res);
});
server.listen(process.argv[2])
