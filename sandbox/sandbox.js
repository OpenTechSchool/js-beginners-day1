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
  frame.style.width = document.body.clientWidth + "px";
  frame.style.height = (document.body.clientHeight - document.getElementById("controls").offsetHeight) + "px";
  if (state == "view") editorDiv.style.top = document.body.clientHeight + "px";
}

window.onload = function() {
  frame = document.getElementById("frame");
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

function loadFile() {
  var file = document.location.hash.slice(1);
  var m = file.match(/^(.*)\.\w+$/);
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
      getFile(htmlfile, function(txt) {wrap = txt;}, true);
    } else {
      editor.setValue(txt);
    }
  }, true);
}

window.addEventListener("hashchange", loadFile, false);

function showError(msg) { alert(msg); }

function render() {
  editorDiv.style.top = document.body.clientHeight + "px";
  var doc = frame.contentWindow.document;
  doc.open();
  if (mode == "javascript") {
    doc.write(wrap + "<script>" + editor.getValue() + "</script>");
  } else {
    doc.write(editor.getValue());
  }
  doc.close();
  frame.style.display = "block";
  state = "view";
  document.getElementById("editbutton").disabled = false;
}

function edit() {
  editorDiv.style.top = "40px";
  state = "edit";
  document.getElementById("editbutton").disabled = true;
}
