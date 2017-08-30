var scene_manager;

var server_address = "http://192.168.1.111:8080";
var server_ready;

var allow_fs;

var game_id;

function setup() {

  // http://mediag.com/news/popular-screen-resolutions-designing-for-all/
  //createCanvas(853, 480);
  if (/Mobi/.test(navigator.userAgent)) {
    createCanvas(displayWidth, displayHeight);
    allow_fs = true;
  } else {
    createCanvas(853, 480);
    allow_fs = false;
  }
  console.log(width, height);

  //window.addEventListener("orientationchange", resizeCanvas(displayWidth, displayHeight) );
  //https://github.com/processing/p5.js/issues/839

  scene_manager = new SceneManager();
  scene_manager.addScene(scene_connect);
  scene_manager.addScene(scene_register);
  scene_manager.addScene(scene_wait);
  scene_manager.addScene(scene_play);
  scene_manager.showNextScene();

  // SOCKET
  scene_manager.socket = io.connect(server_address);

  scene_manager.socket.on('hello',
  function(data) {
    console.log("Got: " + data);
  });

  scene_manager.socket.emit('scene', 'main');
}

function draw() {
  
  if (! server_ready) {
    if (! scene_manager.isCurrent(scene_connect)) {
      scene_manager.showScene(scene_connect);
    }
  }
  scene_manager.draw();
}

function mousePressed() {
  scene_manager.mousePressed();
}

function touchStarted () {
  //goFullscreen();
}

function goFullscreen() {
  if (!allow_fs) { return; }

  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
    resizeCanvas(displayWidth, displayHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function pdefault(e){
  e.preventDefault()
}
