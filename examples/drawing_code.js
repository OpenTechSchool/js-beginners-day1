var canvas, ctx;

window.onload = function() {
  setTimeout(function() {
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");
    clear();
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

var pushDepth = 0;

function clear() {
  for (var i = 0; i < pushDepth; ++i)
    ctx.restore();
  resize();
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.translate(centerx, centery);
  ctx.scale(1, -1);
  pushDepth = 2;
}

function box(x, y, w, h) {
  ctx.fillRect(x, y - h, w, h);
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}

function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function path(spec) {
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
        ctx.moveTo(arg(), arg());
      } else if (cmd == "l") {
        ctx.lineTo(arg(), arg());
      } else if (cmd == "q") {
        var x = arg(), y = arg();
        ctx.quadraticCurveTo(arg(), arg(), x, y);
      } else {
        throw new Error("Unrecognized path command: '" + cmd + "'");
      }
    }
    ctx.stroke();
  } catch(e) {
    console.log("Bad path: " + e.message);
  }
}

function text(x, y, string) {
  ctx.save();
  ctx.scale(1, -1);
  ctx.font = "16px sans-serif";
  ctx.fillText(string, x, -y);
  ctx.restore();
}

function rotate(angle) {
  ctx.save();
  ++pushDepth;
  ctx.rotate(angle * Math.PI / 180);
}

function moveTo(x, y) {
  ctx.save();
  ++pushDepth;
  ctx.translate(x, y);
}

function scale(factor) {
  ctx.save();
  ++pushDepth;
  ctx.scale(factor, factor);
}

function goBack() {
  ctx.restore();
  --pushDepth;
}
