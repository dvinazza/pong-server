var Game = require('./game.js');

var clients = {};
var games = {};

var t1 = setInterval(function() {
  console.log("Clientes online: ", Object.keys(clients).length);
}, 1000);

var t2 = setInterval(function() {
  console.log("Juegos activos: ", Object.keys(games).length);
}, 1000);

function Server() {

  this.handleGames = function() {
      for (gid in games) {
        //console.log(games[gid]);
        if (games[gid].ended) {
          console.log("DELETE: ", gid, ":", games[gid].scores);
          delete games[gid];
        }
      }
  }
  setInterval(this.handleGames.bind(this), 15);

  this.handleSocket = function(socket) {
    console.log('New client ', socket.id);

    socket.on('test',
      function(data, callback) {
        console.log('test: ', data)
        callback('Greetings profesor Falken!');
        clients[socket.id] = socket;
    })

    socket.on('awaiting_game',
      function(data, callback) {
        //console.log('test: ', data)

        //chequeo que no esté en otro juego
        for (gid in games) {
          if (gid in games[gid].sockets) {
            console.log(gid, ": No soup for you!");
            return;
          };
        }

        //Genero un canal nuevo para el juego
        var game = new Game();
        //socketio.join(game.id);

        callback(game.id);
        game.add_client(socket);
        games[game.id] = game;
    })

    //this.clients[socket.id] = socket;

    //console.log("Clients online: ", clients);
    //socket.emit('hello', 'Greetings profesor Falken!');

    socket.on('scene',
      function(data) {
        console.log(socket.id + ": " + data);
      })

      socket.on('disconnect',
      function() {
        console.log("Client has disconnected: " + socket.id);
        //var client = clients[socket.id];
        console.log("games:", games);

        for (gid in games) {
          //console.log("game_id=", game_id); //, " has ", games[game_id].sockets.length, "players.");

          for (cid in games[gid].sockets) {
            console.log("client_id", cid);
            //console.log("searching in ", game_id, ":", client_id);
          }
        }

        delete clients[socket.id];
      });
    }
}

module.exports = Server;
