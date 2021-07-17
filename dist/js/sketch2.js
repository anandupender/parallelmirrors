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

let numReflections = 5;

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

function drawRays(){

    var prevYVal = 0;
    let numReflectionsIsEven = numReflections % 2;

    let distBetweenObjAndMirror = objectPos.x - mirror1Pos.x;
    if (!numReflectionsIsEven) distBetweenObjAndMirror = distBetweenMirrors - distBetweenObjAndMirror;
    let ratio = calcRatio(mirrorHeight/2,distBetweenMirrors,distBetweenObjAndMirror,distBetweenMirrors/2,numReflections);
    console.log(ratio);

    let yRepeatHeight = ratio * distBetweenMirrors;


    for (i = 0; i < numReflections + 1 ; i++){
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
            //middle line
            point1 = {x: ((i % 2 == numReflectionsIsEven) ? mirrorCenter - distBetweenMirrors/2 : mirrorCenter + distBetweenMirrors/2), y: 0};
            point1.y = prevYVal;
            point2 = {x: ((i % 2 != numReflectionsIsEven) ? mirrorCenter - distBetweenMirrors/2 : mirrorCenter + distBetweenMirrors/2), y: 0};
            point2.y = prevYVal + yRepeatHeight;
        }
        prevYVal = point2.y;
        line(point1.x,point1.y,point2.x,point2.y);
    }

    for (i = 0; i < 6 ; i++){
        let numReflectionsIsEven = i % 2;
        let distBetweenObjAndMirror = objectPos.x - mirror1Pos.x;
        if (numReflectionsIsEven) distBetweenObjAndMirror = distBetweenMirrors - distBetweenObjAndMirror;

        let x = mirror1Pos.x - (distBetweenObjAndMirror + distBetweenMirrors*i);

        // Virtual Object 1
        if(i == numReflections - 1){
            fill('#000000AA');
            stroke("#000000");
            line(viewerPos.x,viewerPos.y,x,objectPos.y)
            noStroke();
        }
        else{
            fill('#00000022');
            noStroke();
        }
        rectMode(CENTER);

        square(x, objectPos.y, objectSize);
    }


    // // Mirror 2 reflection
    // let reflectionPoint2 = {x: mirrorCenter + distBetweenMirrors/2, y: (viewerPos.y - objectPos.y)/2 + yOffset + mirrorHeight/2};
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