// use_html: drawing.html
function branch(thickness) {
  // Give the branches individuality by randomizing their length
  // (between 2 and 5 times their thickness)
  var height = thickness * (2 + Math.random() * 3);
  // Draw this branch
  color("black");
  box(-thickness / 2, height, thickness, height);

  // Go to the end of this branch
  moveTo(0, height);
  if (thickness < 2) {
    // Draw a leaf, and nothing more, if this branch is very thin
    color("purple");
    circle(0, 0, 5);
  } else {
    // Draw two branches springing from this branch, rotated at
    // 30-degree angles
    rotate(-30);
    branch(thickness * 0.8);
    goBack();
    rotate(30);
    branch(thickness * 0.8);
    goBack();
  }
  // Clears the moveTo above
  goBack();
}

function drawing() {
  // Move down to make room for tree crown
  moveTo(0, -200);
  // Draw the trunk, which in turn draws branches, and so on.
  branch(16);
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
