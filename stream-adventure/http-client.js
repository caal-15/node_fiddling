var request = require('request');
var petition = request.post('http://localhost:8099');

process.stdin.pipe(petition).pipe(process.stdout);
