var through2 = require('through2').obj;
var zlib = require('zlib');
var fs = require('fs');
var crypto = require('crypto');
var tar = require('tar');
var content = '';

var decStream = crypto.createDecipher(process.argv[2], process.argv[3]);
var unzStream = zlib.createGunzip();
var tarStream = tar.Parse();
tarStream.on('entry', function (entry) {
  var encStream = crypto.createHash('md5', { encoding: 'hex' });
  var thrStream = through2(write);
  function write(hex, _, next) {
    this.push(hex + ' ' + entry.path + '\n')
    next();
  }
  if (entry.type == 'File'){
    entry.pipe(encStream).pipe(thrStream).pipe(process.stdout);
  }
});


process.stdin.pipe(decStream).pipe(unzStream).pipe(tarStream)
