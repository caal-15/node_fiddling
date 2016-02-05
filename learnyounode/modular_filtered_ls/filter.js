var fs = require('fs');
var path = require('path');
module.exports = function (folder, filt, callback){
  fs.readdir(folder, function (err, list){
    if (err)
      return callback(err)
    list = list.filter(function (item){
      return path.extname(item) === '.' + filt;
    });
    callback(null, list);
  });
}
