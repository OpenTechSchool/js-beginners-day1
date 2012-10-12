var mode = "javascript", wrap = null;
var frame, editorDiv, frameDiv, editor;

var editorSize = 50;
if (window.localStorage && localStorage.hasOwnProperty("editorSize"))
  editorSize = Number(localStorage.editorSize);

function getFile(file, c, showErr) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../examples/" + file, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) c(xhr.responseText);
      else if (showErr) showError("Could not fetch file '" + file + "': " + xhr.statusText);
    }
  };
  xhr.send(null);
}

function resize() {
  var total = document.body.clientHeight;
  var top = total * editorSize / 100, bottom = total - top;
  editorDiv.style.height = (top - 40) + "px";
  editor.getScrollerElement().style.height = (editorDiv.clientHeight - 40) + "px";
  frameDiv.style.height = bottom + "px";
  if (frame) resizeFrame();
}

function resizeFrame() {
  frame.style.width = frameDiv.clientWidth + "px";
  frame.style.height = frameDiv.clientHeight + "px";
}

window.onload = function() {
  editorDiv = document.getElementById("editor");
  frameDiv = document.getElementById("output");
  editor = CodeMirror(editorDiv, {
    lineNumbers: true,
    lineWrapping: true,
    mode: "null",
    matchBrackets: true,
  });
  window.addEventListener("resize", resize, false);
  document.getElementById("controls").addEventListener("mousedown", maybeStartResize, false);
  resize();

  loadFile();
};

function maybeStartResize(e) {
  if (e.target != document.getElementById("controls")) return;
  e.preventDefault();
  var curY = e.clientY, startY = curY, startHeight = parseInt(editorDiv.style.height) + 40;
  if (frame) frame.style.display = "none";
  function drag(e) {
    var dY = e.clientY - curY;
    if (Math.abs(dY) > 3) {
      curY = e.clientY;
      var curHeight = Math.max(45, startHeight + (startY - curY));
      editorSize = Math.min(100, Math.floor(curHeight * 100 / document.body.clientHeight));
      resize();
    }
  }
  function done() {
    if (frame) frame.style.display = "";
    window.removeEventListener("mousemove", drag, false);
    window.removeEventListener("mouseup", done, false);
    if (window.localStorage) localStorage.editorSize = editorSize;
  }
  window.addEventListener("mousemove", drag, false);
  window.addEventListener("mouseup", done, false);
}

function updateLoadList(filename) {
  if (!window.localStorage) {
    document.getElementById("save-load").style.display = "none";
    return;
  }
  var saved = [], test = filename + "-";
  for (var field in localStorage) {
    if (field.slice(0, test.length) == test)
      saved.push(field.slice(test.length));
  }
  var load = document.getElementById("load");
  var opts = "<option value=\"*\">Load…</option>";
  for (var i = 0; i < saved.length; ++i)
    opts += "<option value=\"" + htmlEsc(test + saved[i]) + "\">" + htmlEsc(saved[i]) + "</option>";
  load.innerHTML = opts;
  load.options[0].selected = true;
  load.disabled = saved.length == 0;
}

function load() {
  var load = document.getElementById("load"), val = load.value;
  if (val == "*") return;
  editor.setValue(localStorage[val]);
}

function save() {
  var name = document.getElementById("savename").value;
  var file = document.location.hash.slice(1);
  for (var i = 1; !name; ++i) {
    if (!localStorage.hasOwnProperty(file + "-" + i))
      name = i;
  }
  localStorage[file + "-" + name] = editor.getValue();
  updateLoadList(file);
}

function loadFile() {
  var file = document.location.hash.slice(1);
  document.title = "Sandbox: " + file;
  updateLoadList(file);
  var m = file.match(/^(.*)\.(\w+)$/);
  if (m && m[2] == "html") mode = "html";
  else mode = "javascript";

  document.getElementById("docname").innerText = file;

  getFile(file, function(txt) {
    editor.setOption("mode", mode == "javascript" ? mode : "text/html");
    if (mode == "javascript") {
      var htmlfile = (m ? m[1] : file) + ".html";
      var annot = txt.match(/^\/\/ use_html: (\S+)\n/);
      if (annot) {
        txt = txt.slice(annot[0].length);
        htmlfile = annot[1];
      }
      editor.setValue(txt);
      getFile(htmlfile, function(txt) {
        wrap = txt;
        render();
      }, true);
    } else {
      editor.setValue(txt);
      render();
    }
  }, true);
}

window.addEventListener("hashchange", loadFile, false);
window.addEventListener("keydown", function(event){
  // ctrl and enter = render
  if (event.ctrlKey && event.keyCode === 13) {
    event.preventDefault();
    render();
  }
});

function showError(msg) { alert(msg); }

function render() {
  if (frame) frame.parentNode.removeChild(frame);
  frame = document.createElement("iframe");
  frame.src = "about:blank";
  frameDiv.appendChild(frame);
  resizeFrame();
  setTimeout(function() {
    var doc = frame.contentWindow.document;
    doc.open();
    if (mode == "javascript") {
      doc.write(wrap + "<script>" + editor.getValue() + "</script>");
    } else {
      doc.write(editor.getValue());
    }
    doc.close();
  }, 50);
}

var dummy = document.createElement("div");
function htmlEsc(str) {
  dummy.textContent = str;
  return dummy.innerHTML;
}
