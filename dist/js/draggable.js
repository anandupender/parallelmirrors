// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
  constructor(x, y, w, h) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.cornerOffset = w/2;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x - this.cornerOffset && mouseX < this.x - this.cornerOffset + this.w && mouseY > this.y - this.cornerOffset && mouseY < this.y + this.h - this.cornerOffset) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update(limit) {
    // Adjust location if being dragged
    if (this.dragging) {
        this.x = mouseX + this.offsetX;
        if(this.x < limit.minX){
            this.x = limit.minX;
        }
        if(this.x > limit.maxX){
            this.x = limit.maxX;
        }
    //   this.y = mouseY + this.offsetY;
    }
    return {x:this.x,y: this.y};
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      //fill(50);
      fill("#000000FF");
    } else if (this.rollover) {
        fill("#000000FF")
    } else {
      fill("#000000CC");
    }
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x - this.cornerOffset && mouseX < this.x - this.cornerOffset + this.w && mouseY > this.y - this.cornerOffset && mouseY < this.y + this.h - this.cornerOffset) {
        this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
    //   this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}