var filter = require('./filter.js');
filter(process.argv[2], process.argv[3], function (err, list){
  if (err)
    return cosole.console.error('Bad Luck', err);
  list.forEach(function (item){
    console.log(item);
  });
});
