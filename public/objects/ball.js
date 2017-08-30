

function Ball() {
  this.pos = createVector(width/2, height/2);
  this.diameter = 20;

  this.draw = function() {
    //console.log('Drawing Ball');
    fill(255);
    ellipse(this.pos.x * width, this.pos.y * height, this.diameter, this.diameter);
  }
}
