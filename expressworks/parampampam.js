var express = require('express');
var crypto = require('crypto');
var sha1 = crypto.createHash('sha1');

app = express();

app.put('/message/:id', function (req, res) {
  var id = req.params.id;
  res.end(sha1.update(new Date().toDateString() + id).digest('hex'));
})

app.listen(process.argv[2]);
