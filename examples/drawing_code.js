var _canvas, _ctx;

window.onload = function() {
  setTimeout(function() {
    _canvas = document.getElementById("mycanvas");
    _ctx = _canvas.getContext("2d");
    clear();
    drawing();
  }, 20);
};

function color(col) {
  _ctx.strokeStyle = _ctx.fillStyle = col; 
}

function lineWidth(n) {
  _ctx.lineWidth = n; 
}

var _pushDepth = 0, _centerX, _centerY;

function clear() {
  for (var i = 0; i < _pushDepth; ++i)
    _ctx.restore();
  var w = document.body.clientWidth - 5, h = document.body.clientHeight - 5;
  _canvas.width = w;
  _canvas.height = h;
  _ctx.clearRect(0, 0, w, h);
  _ctx.translate(_centerX = Math.round(w / 2), _centerY = Math.round(h / 2));
  _ctx.scale(1, -1);
  _pushDepth = 2;
}

function box(x, y, w, h) {
  _ctx.fillRect(x, y - h, w, h);
}

function circle(x, y, r) {
  _ctx.beginPath();
  _ctx.arc(x, y, r, 0, 2 * Math.PI);
  _ctx.fill();
}

function line(x1, y1, x2, y2) {
  _ctx.beginPath();
  _ctx.moveTo(x1, y1);
  _ctx.lineTo(x2, y2);
  _ctx.stroke();
}

function path(spec) {
  _ctx.beginPath();
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
        _ctx.closePath();
      } else if (cmd == "g") {
        _ctx.moveTo(arg(), arg());
      } else if (cmd == "l") {
        _ctx.lineTo(arg(), arg());
      } else if (cmd == "q") {
        var x = arg(), y = arg();
        _ctx.quadraticCurveTo(arg(), arg(), x, y);
      } else {
        throw new Error("Unrecognized path command: '" + cmd + "'");
      }
    }
    _ctx.stroke();
  } catch(e) {
    console.log("Bad path: " + e.message);
  }
}

function text(x, y, string) {
  _ctx.save();
  _ctx.scale(1, -1);
  _ctx.font = "16px sans-serif";
  _ctx.fillText(string, x, -y);
  _ctx.restore();
}

function rotate(angle) {
  _ctx.save();
  ++_pushDepth;
  _ctx.rotate(angle * Math.PI / 180);
}

function moveTo(x, y) {
  _ctx.save();
  ++_pushDepth;
  _ctx.translate(x, y);
}

function scale(factor) {
  _ctx.save();
  ++_pushDepth;
  _ctx.scale(factor, factor);
}

function goBack() {
  _ctx.restore();
  --_pushDepth;
}
