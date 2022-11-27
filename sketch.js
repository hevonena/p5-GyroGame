var w = window.innerWidth;
var h = window.innerHeight;  

let permissionGranted = false;
let c1x, c1y;
let c2x, c2y;
let r;
let score1y, score2y;
let score1, score2;
let target1x, target1y;
let target2x, target2y;
let targetSize;

function setup() {
  canvas=createCanvas(w, h);
  
  c1x = w/2;
  c1y = h/2;
  c2x = w/2;
  c2y = h/2;
  
  r = w/4;
  
  score1y = h/10;
  score2y = 9*h/10;
  
  score1 = 0;
  score2 = 0;
  
  target1x = random(w);
  target1y = random(h);
  
  target2x = random(w);
  target2y = random(h);
  
  targetSize = r/2;
  
  // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device
    
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time
        let button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      })
  } else {
    // non ios 13 device
    textSize(w/10);
    // text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);
  
  this.remove();
}

function draw() {
  if (!permissionGranted) return;
  background(255);
  

  //scores  
  fill(255, 0, 0);
  push();
  translate(w/7, score1y);
  rotate(PI);
  textSize(w/5);
  text(score1, 0, 0);
  pop();
  
  fill(0, 0, 255);
  push();
  translate(6*w/7, score2y);
  textSize(w/5);
  text(score2, 0, 0);
  pop();  
  
  //targets
  fill(255, 0, 0);
  circle(target1x, target1y, targetSize);
  
  fill(0, 0, 255);
  circle(target2x, target2y, targetSize);
  
  
  
  
  // rotationX, rotationY
  const dx = constrain(rotationY, -5, 5);
  const dy = constrain(rotationX, -5, 5);
  c1x += dx*2;
  c1y += dy*2;
  c1x = constrain(c1x, 0, w);
  c1y = constrain(c1y, 0, h);
  
  c2x += dx*2;
  c2y += dy*2;
  c2x = constrain(c2x, 0, w);
  c2y = constrain(c2y, 0, h);
  
  //cx = mouseX;
  //cy = mouseY;
  
  fill(255, 200, 200);
  circle(c1x, c1y, r);
  
  fill(200, 200, 255);
  circle(c2x, c2y, r);
  
  if (reachedTarget(c1x, c1y, r, target1x, target1y, targetSize)) {
    resetBall(1);
  } else if (reachedTarget(c2x, c2y, r, target2x, target2y, targetSize)) {
    resetBall(2);
  }

}

function reachedTarget(cirX, cirY, rad, tX, tY, tSize){
  return dist(cirX, cirY, tX, tY) <= rad-tSize;
}

function resetBall(team) {
  if (team == 1) {
    c1x = w/2;
    c1y = h/2
    target1x = random(w);
    target1y = random(h);
    score1 ++;
  } else {
    c2x = w/2;
    c2y = h/2
    target2x = random(w);
    target2y = random(h);
    score2 ++;
  }
}

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;  
  canvas.size(w,h);
}

