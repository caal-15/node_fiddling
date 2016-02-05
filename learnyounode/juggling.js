var http = require('http');
var bl = require('bl');
var counter = 0;
var list = [];

function getData(url, index){
  http.get(url, function(response){
    response.pipe(bl(function (err, data){
      if (err)
        console.error('Bad Luck', err);
      list[index] = data.toString();
      counter++;
      if (counter == 3)
        list.forEach(function(item){
          console.log(item);
        });
    }));
  });
}

for (var i = 0; i < 3; ++i)
  getData(process.argv[i + 2], i);
