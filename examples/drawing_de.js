// use_html: drawing.html
// Dies ist die Definition einer Zeichnung:

function drawing() {
  color("yellow");
  circle(0, 0, 50);
  color("black");
  circle(-20, 10, 7);
  circle(20, 10, 7);
  lineWidth(3);
  path("g -20 -10 q 20 -10 0 -50 c");
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
