const canvasWidth = 1000;
const canvasHeight = 600;

var distBetweenMirrors = 150;
let mirror1Pos = {x:canvasWidth/2 - distBetweenMirrors/2}
let mirror2Pos = {x:canvasWidth/2 + distBetweenMirrors/2}
var mirrorHeight = 200;
var yOffset = 150;

const lineWidthL = 4;
const lineWidthM = 2;
const lineWidthS = 1;

let object;
const objectSize = 40;
let objectPos = {x:canvasWidth/2,y:yOffset+mirrorHeight/2}

const viewerSize = 30;
let viewerPos = {x:canvasWidth/2,y:yOffset+mirrorHeight}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    object = new Draggable(objectPos.x, objectPos.y, objectSize, objectSize);
  }
  
  function draw() {
    background(220);

    drawMirrors();
    drawBox();


    object.over();
    var newPos = object.update({minX:mirror1Pos.x + objectSize/2,maxX:mirror2Pos.x - objectSize/2});
    objectPos = newPos;
    object.show();


    drawRays();
    drawViewer();
  }

  function drawMirrors(){
      strokeWeight(lineWidthL);
      stroke('#0000FF');
      strokeCap(SQUARE);
      line(mirror1Pos.x, yOffset, mirror1Pos.x, yOffset + mirrorHeight);
      line(mirror2Pos.x, yOffset, mirror2Pos.x, yOffset + mirrorHeight);
  }

  function drawBox(){
    stroke('#000000');
    line(canvasWidth/2 - distBetweenMirrors/2, yOffset, canvasWidth/2 + distBetweenMirrors/2, yOffset)
  }

  function drawViewer(){
    fill('#FF0000');
    rectMode(CENTER);
    square(viewerPos.x, viewerPos.y, viewerSize);
}

function drawRays(){
    strokeWeight(lineWidthM);
    stroke('#000000');
    noFill();

    // Mirror 1 reflection
    let reflectionPoint = {x: canvasWidth/2 - distBetweenMirrors/2, y: (viewerPos.y - objectPos.y)/2 + yOffset + mirrorHeight/2};
    line(objectPos.x,objectPos.y, reflectionPoint.x, reflectionPoint.y);
    line(reflectionPoint.x,reflectionPoint.y, viewerPos.x, viewerPos.y);

    // Mirror 2 reflection
    let reflectionPoint2 = {x: canvasWidth/2 + distBetweenMirrors/2, y: (viewerPos.y - objectPos.y)/2 + yOffset + mirrorHeight/2};
    line(objectPos.x,objectPos.y, reflectionPoint2.x, reflectionPoint2.y);
    line(reflectionPoint2.x,reflectionPoint2.y, viewerPos.x, viewerPos.y);

    // Virtual Object 1
    noStroke();
    fill('#00000055');
    rectMode(CENTER);
    square(mirror1Pos.x - (objectPos.x - mirror1Pos.x), objectPos.y, objectSize);

    // Virtual Object 1
    square(mirror2Pos.x + (mirror2Pos.x - objectPos.x), objectPos.y, objectSize);
}

function mousePressed() {
    object.pressed();
  }
  
  function mouseReleased() {
    object.released();
  }