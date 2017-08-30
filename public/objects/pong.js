
function Pong(socket) {

  this.ball = new Ball();
  this.bats = [
      new Bat(0.05),
      new Bat(0.95)
  ];

  this.score = [0, 0];
  this.scoreColor = ['red', 'blue'];
  this.gameEnded = false;

  //this.socket = io.connect(game_id);

  this.registerEvents = function(socket) {
    this.socket = socket;

    this.socket.on('ball', listen_ball.bind(this));
    this.socket.on('bats', listen_bats);
    this.socket.on('score', listen_score);
    this.socket.on('endgame', listen_endgame);
  }

  this.unregisterEvents = function() {
    this.socket.removeListener('ball', listen_ball.bind(this));
    this.socket.removeListener('bats', listen_bats);
    this.socket.removeListener('score', listen_score);
    this.socket.removeListener('endgame', listen_endgame);
  }

  this.drawScores = function() {
    textSize(width/10);
    textAlign(CENTER, CENTER)
    noStroke();
    fill(this.scoreColor[0]);
    text(this.score[0], width*1/4, height*1/10);
    fill(this.scoreColor[1]);
    text(this.score[1], width*3/4, height*1/10);

    fill(0);
    for (var i=0; i<1; i+=0.1) {
      rect(i*width, height/2, i+0.05*width, 0.025*height);
    }
  }

  this.draw = function() {
    //console.log('Drawing Pong');
    this.drawScores();

    this.ball.draw();
    this.bats[0].draw();
    this.bats[1].draw();
  }

  //listeners
  function listen_ball(data) {
    //console.log();
    this.ball.pos.x = data.x;
    this.ball.pos.y = data.y;
  }

  function listen_bats(data) {
    console.log(data);
    game.bats[0].pos.y = data[0];
    game.bats[1].pos.y = data[1];
  }

  function listen_score(data) {
    //console.log(data);
    game.score = data;
  }

  function listen_endgame(data) {
    //console.log(data);
    this.gameEnded = true;
  }
}
