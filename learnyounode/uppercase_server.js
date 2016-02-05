var http = require('http');
var bl = require('bl');
var map = require('through2-map');
server = http.createServer (function (req, res) {
  if (req.method === 'POST'){
    req.pipe(map(function(item){
      return item.toString().toUpperCase();
    })).pipe(res);
  } else {
    res.end('Only POST');
  }
});

server.listen(process.argv[2]);
