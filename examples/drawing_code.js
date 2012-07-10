var canvas, ctx;

window.onload = function() {
  setTimeout(function() {
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");
    resize();
    drawing();
  }, 20);
};

var centerx, centery;

function resize() {
  var w = document.body.clientWidth - 5, h = document.body.clientHeight - 5;
  canvas.width = w;
  centerx = Math.round(w / 2);
  canvas.height = h;
  centery = Math.round(h / 2);
}

function color(col) {
  ctx.strokeStyle = ctx.fillStyle = col; 
}

function lineWidth(n) {
  ctx.lineWidth = n; 
}

function clear() {
  resize();
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function $x(x) { return centerx + x; }
function $y(y) { return centery - y; }

function box(x, y, w, h) {
  ctx.fillRect($x(x), $y(y), w, h);
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc($x(x), $y(y), r, 0, 2 * Math.PI);
  ctx.fill();
}

function line(spec) {
  ctx.beginPath();
  var parsed = spec.split(/\s+/g);
  function arg() {
    if (i == parsed.length) throw new Error("Expected number, found end of command.");
    var val = Number(parsed[++i]);
    if (isNaN(val)) throw new Error("Expected number, found '" + parsed[i] + "'");
    return val;
  }
  try {
    for (var i = 0; i < parsed.length; ++i) {
      var cmd =  parsed[i];
      if (cmd == "c") {
        ctx.closePath();
      } else if (cmd == "g") {
        ctx.moveTo($x(arg()), $y(arg()));
      } else if (cmd == "l") {
        ctx.lineTo($x(arg()), $y(arg()));
      } else if (cmd == "q") {
        var x = $x(arg()), y = $y(arg());
        ctx.quadraticCurveTo($x(arg()), $y(arg()), x, y);
      } else {
        throw new Error("Unrecognized path command: '" + cmd + "'");
      }
    }
    ctx.stroke();
  } catch(e) {
    console.log("Bad path: " + e.message);
  }
}
