// use_html: drawing.html
function branch(thickness) {
  // Give the branches individuality by randomizing their length
  // (between 2 and 5 times their thickness)
  var height = thickness * (2 + Math.random() * 3);
  // Draw this branch
  color("black");
  box(-thickness / 2, height, thickness, height);

  // Go to the end of this branch
  moveTo(0, height);
  if (thickness < 2) {
    // Draw a leaf, and nothing more, if this branch is very thin
    color("purple");
    circle(0, 0, 5);
  } else {
    // Draw two branches springing from this branch, rotated at
    // 30-degree angles
    rotate(-30);
    branch(thickness * 0.8);
    goBack();
    rotate(30);
    branch(thickness * 0.8);
    goBack();
  }
  // Clears the moveTo above
  goBack();
}

function drawing() {
  // Move down to make room for tree crown
  moveTo(0, -200);
  // Draw the trunk, which in turn draws branches, and so on.
  branch(16);
}

// Folgende Funktionen stehen zur Verfügung:
//
//  color(string)            - setzt die Farbe
//  lineWidth(number)        - setzt die Dicke der Linie
//  box(x, y, width, height) - zeichnet einen Kasten
//  circle(x, y, radius)     - zeichnet einen Kreis
//  line(x1, y1, x2, y2)     - zeichnet eine Linie
//  text(x, y, string)       - zeichnet einen Text
//  clear()                  - leert den Bildschirm
//  path(string)             - zeichnet eine komplexe Linie (Pfad)
//    Für einen Pfad kann man folgende Anweisungen geben:
//    g x y - zum Punkt x,y bewegen, ohne zu zeichnen
//    l x y - zeichet eine Linie vom aktuellen Punkt bis zum Punkt x,y
//    c     - zeichnet eine Linie, die zurückführt zum Anfang des Pfads
//    q x y cx cy - zeichnet eine Kurve zu x,y, wobei cx,cy als
//                  „Kontrollpunkt“ zur Definition der Rundung dient
//
// Alle Koordinaten (Punkte) werden so interpretiert, dass 0,0 
// im Zentrum des Bildschirms liegt. x ist die horizontale Achse, y die vertikale.
// Positive x-Werte bewegen sich nach links, positive y-Werte bewegen sich nach
// oben.
// Folgende Operationen können dieses Koordinatensystem verändern:
//
//  moveTo(x, y)    - bewegt den Ursprung nach x,y
//  rotate(degrees) - rotiert (dreht) alle nachfolgenden Zeichenoperationen
//                    um die angegebene Gradzahl
//  scale(factor)   - skaliert die nachfolgenden Zeichenoperationen
//                    (größer/kleiner)
//  goBack()        - macht eine Transformation rückgängig
