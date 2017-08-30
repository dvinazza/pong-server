// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

var express = require('express');
var app = express();

// HTTP Portion
var http = require('http');
var server = http.createServer(app);

// Routing
app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(server);

//var Game = require('./game.js');
//var Client = require('./client.js');
var Server = require('./server.js')
var gs = new Server();
io.sockets.on('connection', gs.handleSocket);

server.listen(8080, function() {
  console.log('Server listening');
});

//io.on('connection', function (socket) {
  //console.log(socket.id);
//  var client = new Client(socket);
  //game.add_client(socket);
//});

// WebSocket Portion
// WebSockets work with the HTTP server


// URL module
//var url = require('url');
//var path = require('path');

//global.appRoot = path.resolve(__dirname);
//var port = process.env.PORT || 3000;

// Using the filesystem module
//var fs = require('fs');



// function handleRequest(req, res) {
//   // What did we request?
//   var pathname = req.url;
//
//   // If blank let's ask for index.html
//   if (pathname == '/') {
//     pathname = '/index.html';
//   }
//
//   // Ok what's our file extension
//   var ext = path.extname(pathname);
//
//   // Map extension to file type
//   var typeExt = {
//     '.html': 'text/html',
//     '.js':   'text/javascript',
//     '.css':  'text/css'
//   };
//
//   // What is it?  Default to plain text
//   var contentType = typeExt[ext] || 'text/plain';
//
//   // User file system module
//   fs.readFile(__dirname + pathname,
//     // Callback function for reading
//     function (err, data) {
//       // if there is an error
//       if (err) {
//         res.writeHead(500);
//         return res.en  d('Error loading ' + pathname);
//       }
//       // Otherwise, send the data, the contents of the file
//       res.writeHead(200,{ 'Content-Type': contentType });
//       res.end(data);
//     }
//   );
// }

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
// io.sockets.on('connection',
//   // We are given a websocket object in our function
//   function (socket) {
//
//     console.log("We have a new client: " + socket.id);
//     socket.emit('hello', 'Greetings profesor Falken!');
//
//     socket.on('broadcast',
//       function(data) {
//           console.log(socket.id + ": " + data);
//     })
//
//     //
//     socket.on('control',
//       function(data) {
//           bat0y += data;
//           if (bat0y < 0) { bat0y=0; };
//           if (bat0y > 1) { bat0y=1; };
//
//           console.log(socket.id + ": " + data);
//           console.log(socket.id + ": " + bat0y);
//     })
//
//     // ball
//     var b = setInterval(function() {
//
//       ballX += ballSpeedX;
//       ballY += ballSpeedY;
//
//       if (ballY < 0) {
//         ballSpeedY=-ballSpeedY;
//       }
//
//       if (ballY > 1) {
//         ballSpeedY=-ballSpeedY;
//       }
//
//       if (ballX < 0) {
//         score0+=1;
//         ballX=0.5;
//         socket.emit('score', [score0, score1]);
//       }
//
//       if (ballX > 1) {
//         score1+=1;
//         ballX=0.5;
//         socket.emit('score', [score0, score1]);
//       }
//
//       socket.emit('ball',
//       {
//          x: ballX,
//          y: ballY,
//        });
//     }, 1000/30);
//
//     var b = setInterval(function() {
//       socket.emit('bats',
//       {
//         bat: 0,
//         y: bat0y,
//       });
//     }, 1000/30);
//
//     var b = setInterval(function() {
//       socket.emit('bats',
//       {
//         bat: 1,
//         y: noise(1),
//       });
//     }, 1000/30);
//
//     socket.on('disconnect',
//       function() {
//       console.log("Client has disconnected: " + socket.id);
//     });
//   }
// );
//
// function random(low, high) {
//     return Math.random() * (high - low) + low;
// }
//
// function noise(x) {
//   var now = process.hrtime();
//   return Math.abs(simplex.noise3D(now[0]/10, now[1]/500000000, x));
// }
