// use_html: drawing.html
// The old smiley function from the previous step
function smiley(x, y) {
  moveTo(x, y);
  color("yellow");
  circle(0, 0, 50);
  color("black");
  circle(-20, 10, 7);
  circle(20, 10, 7);
  lineWidth(3);
  path("g -20 -10 q 20 -10 0 -50 c");
  goBack();
}

function drawing() {
  // The angle variable stores the current rotation
  var angle = 0;
  // Draw twenty frames per second (20 * 50 = 1000 milliseconds)
  setInterval(frame, 50);
  function frame() {
    // Clear the screen
    clear();
    // Update the angle
    angle = angle - 2;
    // Rotate what we are about to draw
    rotate(angle);
    // A stick...
    color("black");
    box(-5, 100, 10, 150);
    // with a smiley on top
    smiley(0, 100);
  }
}

// The following functions are available:
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
// Positive x goes to the right, positive y goes up.
// These operations can transform the coordinate system:
//
//  moveTo(x, y)    - move the origin to x, y
//  rotate(degrees) - rotate subsequent drawing operations
//                    by a number of degrees
//  scale(factor)   - scale subsequent drawing operations
//  goBack()        - undo one transformation
