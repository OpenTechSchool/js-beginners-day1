// use_html: drawing.html
function smiley(x, y) {
  moveTo(x, y);
  color("yellow");
  circle(0, 0, 50);
  color("black");
  circle(-20, 10, 7);
  circle(20, 10, 7);
  lineWidth(3);
  line("g -20 -10 q 20 -10 0 -50 c");
  goBack();
}

function drawing() {
  smiley(0, 0);
  smiley(-100, 20);
  smiley(100, 50);
}

// The following functions are available:
//
//  color(string) - set the current color
//  lineWidth(number) - set the line width
//  box(x, y, width, height) - draw a box
//  circle(x, y, radius) - draw a circle
//  clear() - clear the screen
//  line(string) - draw a line
//    In a line description, the following commands are valid:
//    g x y - go to point x,y without drawing
//    l x y - draw a line from the current point to point x,y
//    c     - draw a line back to the start of the line
//    q x y cx cy - draw a curve to x,y, using cx,cy as
//                  'control point' to determine the curvature
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
