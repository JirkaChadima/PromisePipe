var pipe = require('./main.js');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000)

console.log("check localhost:3000");

var PromisePipe = require('./PromisePipe');



app.use(function(req,res,next){
	next();
})
app.use(express.static("./"))



io.on('connection', function (socket) {
  socket.on('messageToServer', function (message) {
    PromisePipe.execTransitionMessage(message).then(function(data){
    	message.data = data;
    	socket.emit('messageToClient', message);
    })
  });
});
