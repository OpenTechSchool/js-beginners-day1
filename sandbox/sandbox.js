var mode = "javascript", wrap = null;
var frame, editorDiv, editor;

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

var state = "edit";

function resize() {
  editor.getScrollerElement().style.height = editorDiv.clientHeight + "px";
  if (frame) resizeFrame();
  if (state == "view") editorDiv.style.top = document.body.clientHeight + "px";
}

function resizeFrame() {
  frame.style.width = document.body.clientWidth + "px";
  frame.style.height = (document.body.clientHeight - document.getElementById("controls").offsetHeight) + "px";
}

window.onload = function() {
  editorDiv = document.getElementById("editor");
  editor = CodeMirror(editorDiv, {
    lineNumbers: true,
    lineWrapping: true,
    mode: "null",
    matchBrackets: true,
  });
  window.addEventListener("resize", resize, false);
  resize();

  loadFile();
};

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
        if (state == "view") render();
      }, true);
    } else {
      editor.setValue(txt);
      if (state == "view") render();
    }
  }, true);
}

window.addEventListener("hashchange", loadFile, false);

function showError(msg) { alert(msg); }

function render() {
  editorDiv.style.top = document.body.clientHeight + "px";
  if (frame) frame.parentNode.removeChild(frame);
  frame = document.createElement("iframe");
  frame.src = "about:blank";
  resizeFrame();
  document.body.appendChild(frame);
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
  state = "view";
  document.getElementById("editbutton").disabled = false;
}

function edit() {
  editorDiv.style.top = "40px";
  setTimeout(function() {
    if (frame) { frame.parentNode.removeChild(frame); frame = null; }
    editor.getScrollerElement().style.height = editorDiv.clientHeight + "px";
  }, 700);
  state = "edit";
  document.getElementById("editbutton").disabled = true;
}

var dummy = document.createElement("div");
function htmlEsc(str) {
  dummy.textContent = str;
  return dummy.innerHTML;
}