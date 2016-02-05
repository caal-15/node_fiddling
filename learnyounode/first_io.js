var fs = require('fs');
var buf = fs.readFileSync(process.argv[2]);
var subs = buf.toString().split('\n');
console.log(subs.length - 1);
