// use_html: drawing.html
function drawing() {
  color("red");
  var count = 0;
  while (count < 20) {
    circle(count * 10, 0, 4);
    count = count + 1;
  }
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
