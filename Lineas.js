class Linea {
 constructor(img, x, y, w, h, velocidad) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.velocidad = velocidad;
  this.angulo = 0;
  this.rotando = false;
  this.rotacionInicial = random(TWO_PI); // Rotación inicial aleatoria
  this.opacidad = 255; // Opacidad inicial
 }

 startRotating() {
  this.rotando = true;
 }

 stopRotating() {
  this.rotando = false;
 }

 rotar() {
  if (this.rotando) {
   this.angulo += this.velocidad;
  }
 }

 desvanecer() {
  if (this.opacidad > 0) {
   this.opacidad -= 5; // Reducir opacidad
  }
 }

 dibujar(capa) {
  capa.push();
  capa.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.rotar();
  capa.rotate(this.angulo);
  capa.rotate(this.angulo + this.rotacionInicial); // Aplicar rotación inicial aleatoria
  capa.tint(255, this.opacidad); // Aplicar opacidad
  capa.image(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  capa.pop();
 }
}
/*
class Linea {
 constructor(x, y, minSize, maxSize, velocidad) {
  this.x = x;
  this.y = y;
  this.w = random(minSize, maxSize);
  this.velocidad = velocidad;
  this.angulo = random(TWO_PI); // Ángulo inicial aleatorio
  this.rotando = false;
  this.opacidad = 255;
  this.bezierPoints = this.generateBezierPoints(x, y, this.w);
 }

 generateBezierPoints(x, y, size) {
  // Definir los puntos de control para la curva de Bézier en forma de S
  let p0 = createVector(85, 20);
  let p1 = createVector(10, 10);
  let p2 = createVector(160, 90);
  let p3 = createVector(50, 80);
  return [p0, p1, p2, p3];
 }

 startRotating() {
  this.rotando = true;
  this.velocidad = random(0.01, 0.05); // Velocidad aleatoria cada vez que empieza a rotar
 }

 stopRotating() {
  this.rotando = false;
 }

 rotar() {
  if (this.rotando) {
   this.angulo += this.velocidad;
  }
 }

 dibujar(capa) {
  this.rotar(); // Actualizar el ángulo de rotación
  capa.push();
  capa.translate(this.x + this.w / 2, this.y + this.w / 2);
  capa.rotate(this.angulo);
  capa.noFill();
  capa.stroke(0, this.opacidad); // Color de línea con opacidad
  capa.bezier(
   this.bezierPoints[0].x, this.bezierPoints[0].y,
   this.bezierPoints[1].x, this.bezierPoints[1].y,
   this.bezierPoints[2].x, this.bezierPoints[2].y,
   this.bezierPoints[3].x, this.bezierPoints[3].y
  );
  capa.pop();
 }

 desvanecer() {
  this.opacidad -= 5; // Ajustar la velocidad del desvanecimiento
  if (this.opacidad < 0) {
   this.opacidad = 0;
  }
 }
}
*/