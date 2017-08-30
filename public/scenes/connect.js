
function scene_connect() {

  this.enter = function() {
    this.sceneManager.socket.emit('scene', 'connect');
    server_ready = false;
  }

  this.setup = function() {

    console.log("Testing connection with server.");
    this.sceneManager.socket.emit('test', navigator.userAgent,
     function(response) {
       console.log("Connection succeded. ", response);
       server_ready = true;
     })

     this.sceneManager.socket.on('timeout', function(reason) {
       console.log("Got timeout: ", reason);
       server_ready = false;
     })

     this.sceneManager.socket.on('connect_error', function(reason) {
       console.log("Got connect_error: ", reason);
       server_ready = false;
     })

     this.sceneManager.socket.on('disconnected', function(reason) {
       //socket.emit('DelPlayer', person_name);
       console.log("Got disconnected: ", reason);
       ready = false;
     });

  }

  this.draw = function() {
    if (server_ready) { this.sceneManager.showNextScene(); }

    background("red");
    textAlign(CENTER);

    fill("black");
    stroke("black");
    text("Cannot connect to server...", width/2, height/2);
  }

  this.mousePressed = function() {
  }

  this.mouseDragged = function() {
  }

}
