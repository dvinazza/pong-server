// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html


// HTTP Portion
var http = require('http');
// URL module
var url = require('url');
var path = require('path');

// Using the filesystem module
var fs = require('fs');

//
var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);

var server = http.createServer(handleRequest);
server.listen(8080);

console.log('Server started on port 8080');

function handleRequest(req, res) {
  // What did we request?
  var pathname = req.url;

  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }

  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  var contentType = typeExt[ext] || 'text/plain';

  // User file system module
  fs.readFile(__dirname + pathname,
    // Callback function for reading
    function (err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    console.log("We have a new client: " + socket.id);
    socket.emit('hello', 'Greetings profesor Falken!');

    socket.on('broadcast',
      function(data) {
          console.log(socket.id + ": " + data);
    })

    // ball
    var b = setInterval(function() {
      socket.emit('ball',
      {
         x: noise(3),
         y: noise(4),
       });
    }, 1000/30);

    var b = setInterval(function() {
      socket.emit('bats',
      {
        bat: 0,
        y: noise(0),
      });
    }, 1000/30);

    var b = setInterval(function() {
      socket.emit('bats',
      {
        bat: 1,
        y: noise(1),
      });
    }, 1000/30);

    socket.on('disconnect',
      function() {
      console.log("Client has disconnected: " + socket.id);
    });
  }
);

function random(low, high) {
    return Math.random() * (high - low) + low;
}

function noise(x) {
  var now = process.hrtime();
  return Math.abs(simplex.noise3D(now[0]/10, now[1]/500000000, x));
}
