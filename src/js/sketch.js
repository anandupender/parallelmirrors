const canvasWidth = 1000;
const canvasHeight = 400;

var distBetweenMirrors = 160;
let mirrorCenter = canvasWidth/1.2;
let mirror1Pos = {x:mirrorCenter - distBetweenMirrors/2}
let mirror2Pos = {x:mirrorCenter + distBetweenMirrors/2}
var mirrorHeight = 200;
var yOffset = 100;

const lineWidthL = 4;
const lineWidthM = 2;
const lineWidthS = 1;

let numReflections = 1;
let numImages = 6;
let imagePositions = [];

let object;
const objectSize = 40;
let objectPos = {x:mirrorCenter,y:yOffset+mirrorHeight/2}

const viewerSize = 30;
let viewerPos = {x:mirrorCenter,y:yOffset+mirrorHeight}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    object = new Draggable(objectPos.x, objectPos.y, objectSize, objectSize);
  }
  
  function draw() {
    background(255);

    drawMirrors();
    drawBox();

    object.over();
    var newPos = object.update({minX:mirror1Pos.x + objectSize/2,maxX:mirror2Pos.x - objectSize/2});
    objectPos = newPos;
    object.show();

    drawRaysAndImages();
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
    line(mirrorCenter - distBetweenMirrors/2, yOffset, mirrorCenter + distBetweenMirrors/2, yOffset)
  }

  function drawViewer(){
    fill('#FF0000');
    rectMode(CENTER);
    square(viewerPos.x, viewerPos.y, viewerSize);
}

function calcRatio(y0, x0, x1, x2, n){
    let retVal = y0/(x2+x1+(n-1)*x0);
    return retVal;
}

function drawRaysAndImages(){

    var prevYVal = 0;
    let numReflectionsIsEven = numReflections % 2;

    let distBetweenObjAndMirror = objectPos.x - mirror1Pos.x;
    if (!numReflectionsIsEven) distBetweenObjAndMirror = distBetweenMirrors - distBetweenObjAndMirror;
    let ratio = calcRatio(mirrorHeight/2,distBetweenMirrors,distBetweenObjAndMirror,distBetweenMirrors/2,numReflections);

    let yRepeatHeight = ratio * distBetweenMirrors;

    // Draw Rays
    for (var i = 0; i < numReflections + 1 ; i++){
        strokeWeight(lineWidthM);
        stroke('#000000');
        noFill();

        var point1 = {x:0,y:0};
        var point2 = {x:0,y:0};
        if(i == 0){
            // beginning line
            point1 = objectPos;
            point2.y = (ratio * distBetweenObjAndMirror) + yOffset + mirrorHeight/2;
            point2.x = ((numReflections % 2 != 0) ? mirrorCenter - distBetweenMirrors/2 : mirrorCenter + distBetweenMirrors/2);
        } else if(i == numReflections){
            // ending line
            point1.x = ((i % 2 == numReflectionsIsEven) ? mirrorCenter - distBetweenMirrors/2 : mirrorCenter + distBetweenMirrors/2);
            point1.y = prevYVal;
            point2 = viewerPos;
        }else{
            //middle lines
            point1 = {x: ((i % 2 == numReflectionsIsEven) ? mirrorCenter - distBetweenMirrors/2 : mirrorCenter + distBetweenMirrors/2), y: 0};
            point1.y = prevYVal;
            point2 = {x: ((i % 2 != numReflectionsIsEven) ? mirrorCenter - distBetweenMirrors/2 : mirrorCenter + distBetweenMirrors/2), y: 0};
            point2.y = prevYVal + yRepeatHeight;
        }
        prevYVal = point2.y;
        line(point1.x,point1.y,point2.x,point2.y);
    }

    // Draw Images
    for (var i = 0; i < numImages ; i++){
        let numReflectionsIsEven = i % 2;
        let distBetweenObjAndMirror = objectPos.x - mirror1Pos.x;
        if (numReflectionsIsEven) distBetweenObjAndMirror = distBetweenMirrors - distBetweenObjAndMirror;

        let x = mirror1Pos.x - (distBetweenObjAndMirror + distBetweenMirrors*i);

        if(i == numReflections - 1){
            stroke("#000000");
            line(viewerPos.x,viewerPos.y,x,objectPos.y);
            fill('#000000FF');
            noStroke();
            square(x, objectPos.y, objectSize);
        }
        else{
            fill('#00000022');
            noStroke();
            square(x, objectPos.y, objectSize);
        }
        imagePositions[i] = x;
    }
}

function checkImagesClicked(){
    for (var i = 0; i < numImages ; i++){
        if (mouseX > imagePositions[i] - objectSize/2 && mouseX < imagePositions[i] + objectSize/2 && mouseY > objectPos.y - objectSize/2 && mouseY < objectPos.y + objectSize/2) {
            console.log(i);
            numReflections = i + 1;
        }
    }
}

function mousePressed() {
    object.pressed();
    checkImagesClicked();
  }
  
  function mouseReleased() {
    object.released();
  }