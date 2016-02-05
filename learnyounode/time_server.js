var net = require('net');
var strftime = require('strftime');
//console.log(strftime('%Y %H:%M'))

server = net.createServer(function (socket){
  socket.end(strftime('%F %H:%M'));
});

server.listen(process.argv[2]);
