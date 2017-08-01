var scene_manager;


function setup()
{

  // http://mediag.com/news/popular-screen-resolutions-designing-for-all/
  createCanvas(853, 480);

  scene_manager = new SceneManager();
  scene_manager.addScene(scene_register);
  scene_manager.addScene(scene_play);
  scene_manager.showNextScene();

  // SOCKET
  scene_manager.socket = io.connect('http://192.168.115.167:8080');

  // HELLO
  scene_manager.socket.on('hello',
  // When we receive data
  function(data) {
    console.log("Got: " + data);
  }
);

scene_manager.socket.emit('broadcast', 'ok computer!');

}

function draw() {
  scene_manager.draw();
}

function mousePressed() {
  scene_manager.mousePressed();
}
