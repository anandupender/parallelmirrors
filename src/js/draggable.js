// Click and Drag an object
// Borrowed and adapted from Daniel Shiffman by Anand Upender

class Draggable {
  constructor(x, y, w, h) {
    this.dragging = false; 
    this.rollover = false;
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
      fill("#000000FF");
    } else if (this.rollover) {
        fill("#000000FF")
    } else {
      fill("#000000CC");
    }
    noStroke();
    rectMode(CENTER);
    tint(255, 255);
    image(objectImage, this.x - this.w/2, this.y - this.w/2, this.h, this.w);
  }

  pressed() {
    if (mouseX > this.x - this.cornerOffset && mouseX < this.x - this.cornerOffset + this.w && mouseY > this.y - this.cornerOffset && mouseY < this.y + this.h - this.cornerOffset) {
        this.dragging = true;
        this.offsetX = this.x - mouseX;
    }
  }

  released() {
    this.dragging = false;
  }
}