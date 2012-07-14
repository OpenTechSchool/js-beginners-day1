var _handlers = {}, mouseX = 0, mouseY = 0;

function setHandler(which, press, release) {
  _handlers[which] = {press: press, release: release};
}

var _keyName = function() {
  var names = {3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
               19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
               36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
               46: "Delete", 59: ";", 91: "Mod", 92: "Mod", 93: "Mod", 109: "-", 107: "=", 127: "Delete",
               186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
               221: "]", 222: "'", 63276: "PageUp", 63277: "PageDown", 63275: "End", 63273: "Home",
               63234: "Left", 63232: "Up", 63235: "Right", 63233: "Down", 63302: "Insert", 63272: "Delete"};
  (function() {
    // Number keys
    for (var i = 0; i < 10; i++) names[i + 48] = String(i);
    // Alphabetic keys
    for (var i = 65; i <= 90; i++) names[i] = String.fromCharCode(i);
    // Function keys
    for (var i = 1; i <= 12; i++) names[i + 111] = names[i + 63235] = "F" + i;
  })();
  return function(e) { return names[e.keyCode] || "Unknown"; };
}();

function _buttonName(e) {
  var which = e.which;
  if (!which) {
    if (e.button & 1) which = 1;
    else if (e.button & 2) which = 3;
    else if (e.button & 4) which = 2;
  }
  if (which == 1 && e.ctrlKey && /Mac/.test(navigator.platform)) which = 3;
  return "Mouse-" + (which == 1 ? "Left" : which == 2 ? "Middle" : "Right");
}

function _doHandle(name, down) {
  var handler = _handlers[name];
  if (!handler) return;
  if (down && handler.state) return;
  handler.state = down;
  var func = handler[down ? "press" : "release"];
  if (func) func();
}

window.addEventListener("keydown", function(e) {_doHandle(_keyName(e), true);}, false);
window.addEventListener("keyup", function(e) {_doHandle(_keyName(e), false);}, false);
window.addEventListener("mousedown", function(e) {_doHandle(_buttonName(e), true);}, false);
window.addEventListener("mouseup", function(e) {_doHandle(_buttonName(e), false);}, false);

window.addEventListener("mousemove", function(e) {
  mouseX = e.pageX - _centerX; mouseY = _centerY - e.pageY;
}, false);
