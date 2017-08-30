

function Bat(posX) {
  this.pos = createVector(posX, height/2);
  this.diameter = 20;

  this.draw = function() {
    fill(255);

    rectMode(CENTER);
    //rect(this.pos.x * width, this.pos.y * height, 0.05 * width, 0.2 * height, 10);
    rect(this.pos.y * width, this.pos.x * height, 0.15 * height, 0.05 * width, 10);

    stroke(0);
    point(this.pos.x * width, this.pos.y * height);
  }
}
