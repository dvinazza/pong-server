function scene_register() {

  this.enter = function() {
    background("teal");
    textAlign(CENTER);

    fill("black");
    text("register", width/2, height/2);

    this.sceneManager.socket.emit('broadcast', 'scene_register');
  }

  this.mousePressed = function() {
    this.sceneManager.showNextScene();
  }

}
