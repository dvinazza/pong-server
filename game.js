//var SimplexNoise = require('simplex-noise');
//var simplex = new SimplexNoise(Math.random);

const crypto = require('crypto');
const win_score = 7;
const win_dif = 1; // > que

function Game() {
  console.log('New Game ', this.id);
  this.id = crypto.randomBytes(4).toString('hex');
  this.sockets = {};

  this.ball = {};
  this.speed = {};
  this.scores = [0, 0];
  this.updateScores = false;
  this.ended = false;

  this.bats = {};
  this.bats_positions = [];

  this.resetBall = function(who) {
    console.log('Reseting ball', who);
    this.ball = { 'x': 0.5, 'y': 0.5 };

    if (who == 0) {
      this.speed = { 'x': 0.001, 'y': -0.0035 }
    } else {
      this.speed = { 'x': 0.001, 'y': 0.0035 }
    }

  }
  this.resetBall();

  this.updateBall = function() {
    this.ball.x += this.speed.x;
    this.ball.y += this.speed.y;

    //check walls
    if (this.ball.x > 1 || this.ball.x < 0) { this.speed.x*=-1; }

    //check bats
    if (this.speed.y < 0  && this.ball.y == 0.05) {
      if (this.ball.x >= this.bats_positions[0]
        && this.ball.x <= this.bats_positions[0]+0.3) {
          this.speed.y*=-1;
        }
    }
    else if (this.speed.y > 0  && this.ball.y == 0.95) {
      if (this.ball.x >= this.bats_positions[1]
        && this.ball.x <= this.bats_positions[1]+0.3) {
            this.speed.y*=-1;
        }
    }

    //check score
    if (this.ball.y > 1) {
      this.scores[0]+=1;
      this.resetBall(0);
      this.updateScores();
    } else if (this.ball.y < 0) {
      this.scores[1]+=1;
      this.resetBall(1);
      this.updateScores();
    }
  }
  var timerBall = setInterval(this.updateBall.bind(this), 10);

  this.updateScores = function() {
    for (sid in this.sockets) {
      this.sockets[sid].emit('score', this.scores);
    }

    if  (
      (this.scores[1] >= win_score && this.scores[1] > this.scores[0] + win_dif)
      ||  (this.scores[0] >= win_score && this.scores[0] > this.scores[1] + win_dif)
    ) {
      this.endGame();
    }
  }

  this.updateClients = function() {
    for (sid in this.sockets) {
      //this.sockets[sid].emit('hello', 'ping!');
      this.sockets[sid].emit('ball', this.ball);
      this.sockets[sid].emit('bats', this.bats_positions);
    }
  }
  var timerClients = setInterval(this.updateClients.bind(this), 20);

  this.add_client = function(socket) {
    this.sockets[socket.id] = socket;

    console.log('Game ', this.id, ': Client added', socket.id);
    socket.emit('Game', this.id);

    this.bats[socket.id] = 0.5;
    socket.on('control', this.updateBat.bind(this, socket.id));

    //console.log(sockets);
  }

  this.updateBat = function(sid, data) {
    console.log('control', sid, data)
    this.bats[sid]+=data;
    if (this.bats[sid] > 1) { this.bats[sid]=1; }
    else if (this.bats[sid] < 0) {this.bats[sid]=0; }

    this.bats_positions = [];
    for (bid in this.bats) {
      this.bats_positions.push(this.bats[bid]);
    }
  }


  this.endGame = function() {
    for (sid in this.sockets) {
      this.sockets[sid].emit('endgame');
    }
    clearInterval(timerClients);
    clearInterval(timerBall);

    this.ended = true;
  }


}

module.exports = Game;
