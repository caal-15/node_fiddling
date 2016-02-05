var concat = require('concat-stream');
function reverseString(str) {
  return str.split("").reverse().join("");
}

process.stdin.pipe(concat(function (data) {
  console.log(reverseString(data.toString()));
}));
