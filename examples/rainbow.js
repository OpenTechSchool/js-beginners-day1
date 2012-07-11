// use_html: drawing.html
function rainbow(x, y) {
  var colors = ["red", "orange", "yellow", "green", "cyan", "purple", "white"];
  var count = 0;
  while (count < colors.length) {
    color(colors[count]);
    circle(x, y, 150 - 5 * count);
    count = count + 1;
  }
}

function drawing() {
  rainbow(-130, 40);
  rainbow(130, -30);
}
