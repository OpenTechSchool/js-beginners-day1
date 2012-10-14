// use_html: interact.html
//  ******************************************
//                 INVADERS.JS
//    A very simple Space Invaders knock-off
//  ******************************************

// The width and height of the game area
var width = 600, height = 300;
// An array containing the currently attacking invaders
var invaders = [];
// Array containing bullets that are currently flying
var bullets = [];
// Set to true when an invader reaches the bottom of the screen
var gameOver = false;

// The player's position is based on the mouse position. Because we
// move the viewport, we have to 'move' mouse coordinates into our own
// coordinate system before we can use them. 'mouseX' is provided by
// the helper code for this example (described near the bottom of the
// program).
function playerX() {
  return mouseX + width / 2;
}

// Add a bullet object at the player's current position.
function fireBullet() {
  bullets.push({x: playerX(), y: 10, alive: true});
}

// Call fireBullet every time the left mouse button is pressed.
// 'setHandler' is also described near the bottom of the program.
setHandler("Mouse-Left", fireBullet);

// Add a new space invader object at a random position along the top
// of the screen.
function newInvader() {
  invaders.push({x: Math.random() * width, y: height, alive: true});
}

// Calculate the distance between two objects. Both objects must have
// x and y properties. Uses a textbook Pythagoras formula. Needed to
// be able to tell when an invader and a bullet collide.
function distance(obj1, obj2) {
  var dx = obj1.x - obj2.x, dy = obj1.y - obj2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// This will
//  - Move each bullet up a little
//  - Draw each bullet
//  - Mark bullets that leave the game area as no longer alive
//  - Check whether a bullet hits an invader.
//    - If it does, mark both it and the invader as dead
function processBullets() {
  for (var b = 0; b < bullets.length; b = b + 1) {
    var bullet = bullets[b];
    bullet.y = bullet.y + 12;
    drawBullet(bullet);
    if (bullet.y > height)
      bullet.alive = false;
    for (var i = 0; i < invaders.length; i = i + 1) {
      var invader = invaders[i];
      if (distance(bullet, invader) < 17) {
        invader.alive = false;
        bullet.alive = false;
      }
    }
  }
}

// Move each invader down a little. Draw them. When one hits the
// bottom of the game area, set gameOver to true and mark the invader
// as dead.
function processInvaders() {
  for (var i = 0; i < invaders.length; i = i + 1) {
    var invader = invaders[i];
    invader.y = invader.y - 2;
    drawInvader(invader);
    if (invader.y < 0) {
      gameOver = true;
      invader.alive = false;
    }
  }
}

// Used to remove dead bullets and invaders at the end of every turn.
function removeDeadObjects(array) {
  var live = [];
  for (var i = 0; i < array.length; ++i) {
    if (array[i].alive)
      live.push(array[i]);
  }
  return live;
}

// Process a single step of the game (done twenty times per second).
function frame() {
  // There is a 5% chance per turn, as long as the game is not over,
  // that a new invader is added.
  // The ! operator means 'not', the && operator means 'and'.
  // So this says 'if not gameOver and Math.random() is less than 0.05'
  if (!gameOver && Math.random() < 0.05)
    newInvader();

  // Clear the view.
  clear();
  // Make 0,0 the bottom left of the game area
  moveTo(-width / 2, -height / 2);
  // Draw a line at ground level.
  color("silver");
  line(0, 0, width, 0);

  processBullets();
  processInvaders();
  // Discard dead objects.
  bullets = removeDeadObjects(bullets);
  invaders = removeDeadObjects(invaders);

  drawPlayer(playerX(), 0);
  if (gameOver) {
    color("red");
    text(playerX() - 40, -25, "GAME OVER");
  }
}

function drawing() {
  setInterval(frame, 50);
}

// Functions for drawing the various elements in the game.

function drawInvader(invader) {
  moveTo(invader.x, invader.y);
  if (invader.alive)
    color("lightgreen");
  else
    color("orange");
  circle(0, 0, 14);
  color("green");
  circle(-12, 8, 8);
  circle(12, 8, 8);
  color("black");
  circle(-12, 8, 4);
  circle(12, 8, 4);
  goBack();
}

function drawPlayer(x, y) {
  moveTo(x, y);
  color("steelblue");
  box(-20, 5, 40, 10);
  color("black");
  box(-6, 15, 4, 14);
  box(2, 15, 4, 14);
  goBack();
}

function drawBullet(bullet) {
  moveTo(bullet.x, bullet.y);
  color("red");
  lineWidth(3);
  line(-4, -4, -4, 4);
  line(4, -4, 4, 4);
  goBack();
}

// Use the setHandler function to respond to key or mouse input.
//  setHandler("Left", goLeft) - to call the goLeft function whenever
//    the left arrow is pressed
//  setHandler("U", startAccelerate, stopAccelerate) - a second
//    function can be given, which will be called when the key is
//    released again. Letter keys are named by uppercase letters.
// Use the names "Mouse-Left", "Mouse-Right", and "Mouse-Middle" for
// the mouse buttons. The variables mouseX and mouseY provide the
// current mouse coordinates.

// These are the old drawing functions:
//
//  color(string)            - set the current color
//  lineWidth(number)        - set the line width
//  box(x, y, width, height) - draw a box
//  circle(x, y, radius)     - draw a circle
//  line(x1, y1, x2, y2)     - draw a line
//  text(x, y, string)       - draw text
//  clear()                  - clear the screen
//  path(string)             - draw a complex line
//    In a line description, the following commands are valid:
//    g x y - go to point x,y without drawing
//    l x y - draw a line from the current point to point x,y
//    c     - draw a line back to the start of the line
//    q x y cx cy - draw a curve to x,y, using cx,cy as
//                  'control point' to determine the curvature
//
//  fill()                   - fill the current path with the current color
//
// Coordinates are interpreted as if 0,0 is the center of the
// screen. x is the horizontal axis, and y the vertical.
// Positive x goes to the left, positive y goes up.
// These operations can transform the coordinate system:
//
//  moveTo(x, y)    - move the origin to x, y
//  rotate(degrees) - rotate subsequent drawing operations
//                    by a number of degrees
//  scale(factor)   - scale subsequent drawing operations
//  goBack()        - undo one transformation
