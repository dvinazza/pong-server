var xMargin = 0.03;

function scene_play() {

  var ball = new Ball();
  var bats = [
    new Bat(xMargin * width),
    new Bat(width - xMargin * width)
  ];

  this.enter = function() {
    this.sceneManager.socket.emit('broadcast', 'scene_play');
    this.sceneManager.socket.on('ball', listener_ball);
    this.sceneManager.socket.on('bats', listener_bats);
  }

  this.setup = function() {

  }

  this.draw = function() {
    background("teal");
    textAlign(CENTER);

    fill("black");
    text("play", width/2, height/2);

    ball.draw();
    bats[0].draw();
    bats[1].draw();
  }

  this.mousePressed = function() {
    this.sceneManager.socket.removeListener('ball', listener_ball);
    this.sceneManager.socket.removeListener('bats', listener_bats);
    this.sceneManager.showNextScene();
  }

  function listener_ball(data) {
    //console.log(data);
    ball.pos.x = data.x;
    ball.pos.y = data.y;
  }

  function listener_bats(data) {
    console.log(data);
    bats[data.bat].pos.y = data.y;

  }
}
