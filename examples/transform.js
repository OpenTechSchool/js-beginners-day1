// use_html: data.html
var width = 600, height = 300;

function visualizeHistory(array, vscale) {
  var hscale = width / array.length;
  for (var pos = 0; pos < array.length; pos = pos + 1) {
    circle(hscale * pos, array[pos] * vscale, 2);
  }
}

function showWorldPopulation() {
  var populationPerYear = []
  var maxPopulation = 6000000000; // Not quite correct!

  // Your code here.

  var verticalScale = height / maxPopulation;
  visualizeHistory(populationPerYear, verticalScale);
}

function drawing() {
  moveTo(-width / 2, -height / 2);
  color("silver");
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  color("blue");
  showWorldPopulation();
}
