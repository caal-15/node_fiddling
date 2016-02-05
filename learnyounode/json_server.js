var url = require('url');
var http = require('http');
var time = {
  hour: '',
  minute:  '',
  second: ''
};

var seconds = {
  unixtime: ''
};

var server = http.createServer(function (req, res) {
  if (req.method != 'GET')
    res.end('Only get');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  var parsedURL = url.parse(req.url, true);
  var date = new Date(parsedURL.query.iso);
  if (parsedURL.pathname == '/api/parsetime'){
    time.hour = date.getHours();
    time.minute = date.getMinutes();
    time.second = date.getSeconds();
    res.end(JSON.stringify(time));
  } else if (parsedURL.pathname == '/api/unixtime'){
    seconds.unixtime = date.getTime();
    res.end(JSON.stringify(seconds));
  }


});
server.listen(process.argv[2]);
