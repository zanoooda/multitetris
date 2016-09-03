var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

app.use('/', express.static(path.join(__dirname, 'tetris')));

server.listen(process.env.PORT || 3000,  process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
