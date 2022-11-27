
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
  createCanvas(windowWidth, windowHeight);
  
  c1x = width/2;
  c1y = height/2;
  c2x = width/2;
  c2y = height/2;
  
  r = 50;
  
  score1y = height/50;
  score2y = 49*height/50;
  
  score1 = 0;
  score2 = 0;
  
  target1x = random(width);
  target1y = random(height);
  
  target2x = random(width);
  target2y = random(height);
  
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
    textSize(48);
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
  translate(width/7, score1y);
  rotate(PI);
  text(score1, 0, 0);
  pop();
  
  fill(0, 0, 255);
  push();
  translate(6*width/7, score2y);
  text(score2, 0, 0);
  pop();  
  
  //targets
  fill(255, 0, 0);
  circle(target1x, target1y, targetSize);
  
  fill(0, 0, 255);
  circle(target2x, target2y, targetSize);
  
  
  
  
  // rotationX, rotationY
  const dx = constrain(rotationY, -3, 3);
  const dy = constrain(rotationX, -3, 3);
  c1x += dx*2;
  c1y += dy*2;
  c1x = constrain(c1x, 0, width);
  c1y = constrain(c1y, 0, height);
  
  c2x += dx*2;
  c2y += dy*2;
  c2x = constrain(c2x, 0, width);
  c2y = constrain(c2y, 0, height);
  
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
    c1x = width/2;
    c1y = height/2
    target1x = random(width);
    target1y = random(height);
    score1 ++;
  } else {
    c2x = width/2;
    c2y = height/2
    target2x = random(width);
    target2y = random(height);
    score2 ++;
  }
}

