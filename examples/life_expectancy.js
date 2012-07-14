// use_html: data.html
var width = 600, height = 300;

function showCountry(country) {
  var step = width / country.life_expectancy.length;
  for (var pos = 0; pos < country.life_expectancy.length; pos = pos + 1) {
    var le = country.life_expectancy[pos];
    circle(step * pos, le * 3, 2);
  }
}

function drawing() {
  moveTo(-width / 2, -height / 2);
  color("red");
  showCountry(countryData[66]); // Germany
  color("green");
  showCountry(countryData[81]); // India
  color("blue");
  showCountry(countryData[150]); // Russia
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
