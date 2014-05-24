// use_html: data.html
var width = 600, height = 300;

function showCountry(country) {
  var step = width / country.life_expectancy.length;
  for (var pos = 0; pos < country.life_expectancy.length; pos = pos + 1) {
    var le = country.life_expectancy[pos];
    circle(step * pos, le * 3, 2);
  }
}

function drawing() {
  moveTo(-width / 2, -height / 2);
  color("red");
  showCountry(countryData[66]); // Germany
  color("green");
  showCountry(countryData[81]); // India
  color("blue");
  showCountry(countryData[150]); // Russian Federation
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
//  fill()                   - fülle den Pfad mit der aktuellen Farbe
//
// Alle Koordinaten (Punkte) werden so interpretiert, dass 0,0 
// im Zentrum des Bildschirms liegt. x ist die horizontale Achse, y die vertikale.
// Positive x-Werte bewegen sich nach rechts, positive y-Werte bewegen sich nach
// oben.
// Folgende Operationen können dieses Koordinatensystem verändern:
//
//  moveTo(x, y)    - bewegt den Ursprung nach x,y
//  rotate(degrees) - rotiert (dreht) alle nachfolgenden Zeichenoperationen
//                    um die angegebene Gradzahl
//  scale(factor)   - skaliert die nachfolgenden Zeichenoperationen
//                    (größer/kleiner)
//  goBack()        - macht eine Transformation rückgängig
