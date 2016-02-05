//Must be completed as sudo!
var express = require('express');
var stylus = require('stylus');
var fs = require('fs');
var style_gen = stylus.middleware(process.argv[3]);
var app = express();

app.use(express.static(process.argv[3]));
app.use(style_gen);

app.get('/main.css', function (req, res) {
  var cssFile = fs.createReadStream(process.argv[3] + '/main.css');
  cssFile.pipe(res);
});

app.listen(process.argv[2]);
