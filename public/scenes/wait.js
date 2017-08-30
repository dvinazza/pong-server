
function scene_wait() {

  this.enter = function() {
    this.sceneManager.socket.emit('scene', 'wait');

    game_id = false;
    this.sceneManager.socket.emit('awaiting_game', navigator.userAgent,
     function(response) {
       console.log("Game: ", response);
       game_id = response;
     });
  }

  this.setup = function() {
  }

  this.draw = function() {
    if (game_id) {
      this.sceneManager.showNextScene(game_id);
    }

    background("yellow");
    textAlign(CENTER);

    fill("black");
    stroke("black");
    text("Waiting Game...", width/2, height/2);
  }

  this.mousePressed = function() {
  }

  this.mouseDragged = function() {
  }

}
