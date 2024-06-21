class ManchaN {
 constructor(img, x, y, w, h, velocidad) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.velocidad = velocidad;
  this.angulo = 0;
  this.rotando = false;
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
  capa.tint(255, this.opacidad); // Aplicar opacidad
  capa.image(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  capa.pop();
 }
}
/*
class ManchaN {
 constructor(x, y, minSize, maxSize, velocidad) {
  this.x = x;
  this.y = y;
  this.w = random(minSize, maxSize);
  this.h = random(minSize, maxSize);
  this.velocidad = velocidad;
  this.angulo = random(TWO_PI); // Ángulo inicial aleatorio
  this.rotando = false;
  this.opacidad = 255;
  this.points = [];
  this.generateBlot(x, y, this.w);
 }

 generateBlot(x, y, size) {
  let angleStep = TWO_PI / 100; // Dividimos el círculo en 100 puntos
  for (let a = 0; a < TWO_PI; a += angleStep) {
   let radius = size * (0.75 + noise(cos(a) * 5, sin(a) * 5) * 0.5);
   let px = x + cos(a) * radius;
   let py = y + sin(a) * radius;
   this.points.push(createVector(px, py));
  }
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
  capa.translate(this.x + this.w / 2, this.y + this.h / 2);
  capa.rotate(this.angulo);
  capa.noStroke();
  capa.fill(0, this.opacidad); // Rellenar la mancha de tinta con opacidad
  capa.beginShape();
  for (let p of this.points) {
   capa.vertex(p.x - this.x - this.w / 2, p.y - this.y - this.h / 2); // Ajustar coordenadas 
  }
  capa.endShape(CLOSE);
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