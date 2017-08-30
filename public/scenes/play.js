
var xMargin = 0.03;
var game;

function scene_play() {

  //var bgColor = "teal";
  var bgColor = color(0,128,128);
  var ctrlX, ctrlY;

  this.enter = function() {
    this.sceneManager.socket.emit('scene', 'play');
    console.log("Joined game:", game_id);

    //reseteo el juego
    game = new Pong();
    game.registerEvents(this.sceneManager.socket);
  }

  this.exit = function() {
    game.unregisterEvents();
  }

  this.setup = function() {
  }

  this.draw = function() {
    background(bgColor);
    textAlign(CENTER);

    fill("black");
    stroke("black");
    //text("play", width/2, height/2);
    //

    if (game.gameEnded) {
      this.exit();
      this.sceneManager.showScene(scene_register);
    }

    if (mouseIsPressed) {
      textSize(width/8);
      if (mouseX/width > 0.5) {
        text("arriba", width/2, height/2);
        this.sceneManager.socket.emit('control', 0.020);
      } else {
        text("abajo", width/2, height/2);
        this.sceneManager.socket.emit('control', -0.020);
      }
    }

    //console.log(game);
    game.draw();
  }

  this.mousePressed = function() {
    //this.sceneManager.socket.removeListener('ball', listener_ball);
    //this.sceneManager.socket.removeListener('bats', listener_bats);
    //this.sceneManager.showNextScene();
    //text("play", mouseX, mouseY);
  }

  this.mouseDragged = function() {
    textSize(width/8);
    text("play", mouseX, mouseY);
    point(mouseX, mouseY);
  }

  this.touchEnded = function() {
    ellipse(touchX, touchY, 5, 5);
    // prevent default
    //bgColor = "red";
    //return false;
  }
}
