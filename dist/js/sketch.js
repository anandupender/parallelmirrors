const canvasWidth = 1000;
const canvasHeight = 600;

var distBetweenMirrors = 250;
let mirror1Pos = {x:canvasWidth/2 - distBetweenMirrors/2}
let mirror2Pos = {x:canvasWidth/2 + distBetweenMirrors/2}
var mirrorHeight = 200;
var yOffset = 150;

const lineWidthL = 4;
const lineWidthM = 2;
const lineWidthS = 1;

let numReflections = 2;

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

function getReflectionPoint(x1, numReflections,iter){
    console.log(numReflections, iter)
    let retVal;
    if(iter == 0){
        retVal = (mirrorHeight*(Math.pow(x1,(iter+1)))/2)/(x1 + (distBetweenMirrors*(numReflections - 1/2)))
    }else{
        retVal = (mirrorHeight*(Math.pow(x1,(iter+1)))*(distBetweenMirrors*iter)/2)/(x1 + (distBetweenMirrors*(numReflections - 1/2)))
    }
    console.log(retVal);
    return retVal;
}

function drawRays(){

    var prevYVal = 0;

    for (i = 0; i < numReflections + 1 ; i++){
        strokeWeight(lineWidthM);
        stroke('#000000');
        noFill();

        var point1 = {x:0,y:0};
        var point2 = {x:0,y:0};
        if(i == 0){
            // beginning line
            point1 = objectPos;
            point2.y = getReflectionPoint((objectPos.x - mirror1Pos.x),numReflections,i) + yOffset + mirrorHeight/2;
            point2.x = canvasWidth/2 - distBetweenMirrors/2;
        } else if(i == numReflections){
            // ending line
            point1.x = ((i % 2 != 0) ? canvasWidth/2 - distBetweenMirrors/2 : canvasWidth/2 + distBetweenMirrors/2);
            point1.y = getReflectionPoint((objectPos.x - mirror1Pos.x),numReflections,i) + yOffset + mirrorHeight/2;
            point2 = viewerPos;
        }else{
            //middle line
            point1 = {x: ((i % 2 != 0) ? canvasWidth/2 - distBetweenMirrors/2 : canvasWidth/2 + distBetweenMirrors/2), y: 0};
            point1.y = prevYVal;
            point2 = {x: ((i % 2 == 0) ? canvasWidth/2 - distBetweenMirrors/2 : canvasWidth/2 + distBetweenMirrors/2), y: 0};
            point2.y = getReflectionPoint((objectPos.x - mirror1Pos.x),numReflections,i) + yOffset + mirrorHeight/2;
        }
        prevYVal = point2.y;
        line(point1.x,point1.y,point2.x,point2.y);
    }

    // Virtual Object 1
    noStroke();
    fill('#00000055');
    rectMode(CENTER);
    square(mirror1Pos.x - (objectPos.x - mirror1Pos.x), objectPos.y, objectSize);

    // // Mirror 2 reflection
    // let reflectionPoint2 = {x: canvasWidth/2 + distBetweenMirrors/2, y: (viewerPos.y - objectPos.y)/2 + yOffset + mirrorHeight/2};
    // line(objectPos.x,objectPos.y, reflectionPoint2.x, reflectionPoint2.y);
    // line(reflectionPoint2.x,reflectionPoint2.y, viewerPos.x, viewerPos.y);

    // Virtual Object 2
    // square(mirror2Pos.x + (mirror2Pos.x - objectPos.x), objectPos.y, objectSize);
}

function mousePressed() {
    object.pressed();
  }
  
  function mouseReleased() {
    object.released();
  }