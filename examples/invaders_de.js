// use_html: interact.html
//  ******************************************
//                 INVADERS.JS
//    Ein einfacher Space Invaders-Abklatsch
//  ******************************************

// Breite (width) und Höhe (height) der Spielfläche
var width = 600, height = 300;
// ein Array (Liste), dass die gerade attackierenden Invaders beinhaltet
var invaders = [];
// ein Array mit den Kugeln, die gerade umherfliegen
var bullets = [];
// soll auf "true" (wahr) gesetzt werden, wenn ein Invader den Boden erreicht
var gameOver = false;

// Die Position des Spieler orientiert sich an der Position des Mauszeigers.
// Weil wir den angezeigten Ausschnitt (viewport) bewegen, müssen wir die
// Maus-Koordinaten in unser eigenes Koordinatensystem überführen, bevor
// wir sie benutzen können. Der 'mouseX'-Wert wird von dem Helfer-Code dieses
// Beispiels zur Verfügung gestellt (Beschreibung am unteren Ende des Programms).
function playerX() {
  return mouseX + width / 2;
}

// Fügt eine Kugel (bullet) ein an der aktuellen Position des Spielers.
function fireBullet() {
  bullets.push({x: playerX(), y: 10, alive: true});
}

// Die Funktion 'fireBullet' wird jedes Mal aufgerufen, wenn die linke Maustaste
// gedrückt wird. 'setHandler' wird auch am unteren Ende des Programms erklärt.
setHandler("Mouse-Left", fireBullet);

// Fügt einen neuen Invader an einer zufälligen Position des oberen
// Bildschirmrands ein.
function newInvader() {
  invaders.push({x: Math.random() * width, y: height, alive: true});
}

// Berechnet die Distanz zwischen zwei Objekten. Beide Objekte müssen die
// Eigenschaften x und y haben. Es wird einfach der Satz des Pythagoras
// verwendet. Die Funktion wird benötigt um festzustellen, wann ein Invader
// von einer Kugel getroffen wird.
function distance(obj1, obj2) {
  var dx = obj1.x - obj2.x, dy = obj1.y - obj2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Die Funktion
//  - bewegt jede Kugel ein Stück nach oben
//  - zeichnet jede einzelne Kugel
//  - markiert Kugeln, die außerhalb der Spielfläche sind als inaktiv
//  - prüft, ob eine Kugel einen Invader trifft
//    - wenn ja, markiert Invader und Kugel als inaktiv (tot)
function processBullets() {
  for (var b = 0; b < bullets.length; b = b + 1) {
    var bullet = bullets[b];
    bullet.y = bullet.y + 12;
    drawBullet(bullet);
    if (bullet.y > height)
      bullet.alive = false;
    for (var i = 0; i < invaders.length; i = i + 1) {
      var invader = invaders[i];
      if (distance(bullet, invader) < 17) {
        invader.alive = false;
        bullet.alive = false;
      }
    }
  }
}

// Bewegt die Invaders ein Stück nach unten und zeichnet sie.
// Wenn einer den Boden erreicht wird 'gameOver' auf "true" (wahr) gesetzt
// und der Invader als tot markiert.
function processInvaders() {
  for (var i = 0; i < invaders.length; i = i + 1) {
    var invader = invaders[i];
    invader.y = invader.y - 2;
    drawInvader(invader);
    if (invader.y < 0) {
      gameOver = true;
      invader.alive = false;
    }
  }
}

// Hier werden nach jeder Runde alle inaktiven bzw. toten Kugel und Invaders
// gelöscht.
function removeDeadObjects(array) {
  var live = [];
  for (var i = 0; i < array.length; ++i) {
    if (array[i].alive)
      live.push(array[i]);
  }
  return live;
}

// Ein einzelner Schritt des Spiels wird abgearbeitet.
// Das passiert zwanzig Mal in der Sekunde.
function frame() {
  // Pro Schritt gibt es eine 5%ige Chance, dass ein neuer Invader hinzukommt.
  // Der !-Operator bedeutet 'nicht', der &&-Operator bedeutet 'und'.
  // Also 'wenn nicht gameOver und Math.random() kleiner als 0.05'.
  if (!gameOver && Math.random() < 0.05)
    newInvader();

  // Clear the view.
  clear();
  // Make 0,0 the bottom left of the game area
  moveTo(-width / 2, -height / 2);
  // Draw a line at ground level.
  color("silver");
  line(0, 0, width, 0);

  processBullets();
  processInvaders();
  // Discard dead objects.
  bullets = removeDeadObjects(bullets);
  invaders = removeDeadObjects(invaders);

  drawPlayer(playerX(), 0);
  if (gameOver) {
    color("red");
    text(playerX() - 40, -25, "GAME OVER");
  }
}

function drawing() {
  setInterval(frame, 50);
}

// Functions for drawing the various elements in the game.

function drawInvader(invader) {
  moveTo(invader.x, invader.y);
  if (invader.alive)
    color("lightgreen");
  else
    color("orange");
  circle(0, 0, 14);
  color("green");
  circle(-12, 8, 8);
  circle(12, 8, 8);
  color("black");
  circle(-12, 8, 4);
  circle(12, 8, 4);
  goBack();
}

function drawPlayer(x, y) {
  moveTo(x, y);
  color("steelblue");
  box(-20, 5, 40, 10);
  color("black");
  box(-6, 15, 4, 14);
  box(2, 15, 4, 14);
  goBack();
}

function drawBullet(bullet) {
  moveTo(bullet.x, bullet.y);
  color("red");
  lineWidth(3);
  line(-4, -4, -4, 4);
  line(4, -4, 4, 4);
  goBack();
}

// Benutze die 'setHandler'-Funktion um auf Tasten- oder Mauseingaben zu
// reagieren.
//  setHandler("Left", goLeft) - ruft die 'goLeft'-Funktion auf, wenn die linke
//    Pfeiltaste gedrückt wird.
//  setHandler("U", startAccelerate, stopAccelerate) - Eine zweite Funktion
//    kann übergeben werden, die aufgerufen wird, wenn die Taste losgelassen
//    wird. Buchstabentasten werden mit Großbuchstaben benannt.
// Die Namen "Mouse-Left", "Mouse-Right" und "Mouse-Middle" werden für die
// Maustasten vwerwendet. Die Variablen 'mouseX' und 'mouseY' enthalten die
// aktuelle Mausposition.

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
