"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Click and Drag an object
// Borrowed and adapted from Daniel Shiffman by Anand Upender
var Draggable = /*#__PURE__*/function () {
  function Draggable(x, y, w, h) {
    _classCallCheck(this, Draggable);

    this.dragging = false;
    this.rollover = false;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.cornerOffset = w / 2;
  }

  _createClass(Draggable, [{
    key: "over",
    value: function over() {
      // Is mouse over object
      if (mouseX > this.x - this.cornerOffset && mouseX < this.x - this.cornerOffset + this.w && mouseY > this.y - this.cornerOffset && mouseY < this.y + this.h - this.cornerOffset) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }
  }, {
    key: "update",
    value: function update(limit) {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = mouseX + this.offsetX;

        if (this.x < limit.minX) {
          this.x = limit.minX;
        }

        if (this.x > limit.maxX) {
          this.x = limit.maxX;
        } //   this.y = mouseY + this.offsetY;

      }

      return {
        x: this.x,
        y: this.y
      };
    }
  }, {
    key: "show",
    value: function show() {
      stroke(0); // Different fill based on state

      if (this.dragging) {
        fill("#000000FF");
      } else if (this.rollover) {
        fill("#000000FF");
      } else {
        fill("#000000CC");
      }

      noStroke();
      rectMode(CENTER);
      tint(255, 255);
      image(objectImage, this.x - this.w / 2, this.y - this.w / 2, this.h, this.w);
    }
  }, {
    key: "pressed",
    value: function pressed() {
      if (mouseX > this.x - this.cornerOffset && mouseX < this.x - this.cornerOffset + this.w && mouseY > this.y - this.cornerOffset && mouseY < this.y + this.h - this.cornerOffset) {
        this.dragging = true;
        this.offsetX = this.x - mouseX;
      }
    }
  }, {
    key: "released",
    value: function released() {
      this.dragging = false;
    }
  }]);

  return Draggable;
}();