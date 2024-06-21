
let CapamanchaG;
let CapamanchaN;
let Capalineas;
let Capafondo;
let fondo;
let cant = 5;
let manchaG = [];
let manchaN = [];
let lineas = [];
let tiempoDentroCapa = 0;
let tiempoAnterior = 0;
let tiempoRotacion = 2000; // 2 segundos
let capaActual = "";
let limiteImagenes = 5;
let manchasG = [];
let manchasN = [];
let manchasLineas = [];
let anguloG = 0;
let anguloN = 0;
let anguloL = 0;

function preload() {
  fondo = loadImage("data/Lienzo2.png"); // Cargar la imagen de fondo

  for (let i = 0; i < cant; i++) {
    let dmanchaG = "data/manchasg" + (i + 1) + ".png";
    let dmanchaN = "data/manchasn" + (i + 1) + ".png";
    let dlineas = "data/Linea" + (i + 1) + ".png";

    manchaG[i] = loadImage(dmanchaG);
    manchaN[i] = loadImage(dmanchaN);
    lineas[i] = loadImage(dlineas);
  }
}

function setup() {
  createCanvas(300, 550);
  Capafondo = createGraphics(300, 550);
  Capafondo.image(fondo, 0, 0, 300, 550);

  CapamanchaG = createGraphics(500, 750);
  CapamanchaN = createGraphics(500, 750);
  Capalineas = createGraphics(500, 750);
}

function draw() {
  background(200);
  image(Capafondo, 0, 0); // Dibujar la capa de fondo

  let tiempoTranscurrido = millis() - tiempoAnterior;
  tiempoAnterior = millis();

  actualizarCapa(tiempoTranscurrido);

  // Manejar las manchas para cada capa
  if (capaActual === "N") {
    manejarManchas(manchasN, ManchaN, manchaN, 150, 250);
    if (manchasN.length === limiteImagenes) {
      anguloN += 0.01; // Incrementa el ángulo de la capa N
    }
  } else if (capaActual === "L") {
    manejarManchas(manchasLineas, Linea, lineas, 100, 250);
    if (manchasLineas.length === limiteImagenes) {
      anguloL += 0.01; // Incrementa el ángulo de la capa L
    }
  } else if (capaActual === "G") {
    manejarManchas(manchasG, ManchaG, manchaG, 250, 450);
    if (manchasG.length === limiteImagenes) {
      anguloG += 0.01; // Incrementa el ángulo de la capa G
    }
  }

  // Dibujar las manchas en sus capas
  dibujarManchas(CapamanchaN, manchasN);
  dibujarManchas(CapamanchaG, manchasG);
  dibujarManchas(Capalineas, manchasLineas);

  // Dibujar las capas en el canvas principal con rotación
  push();
  translate(width / 2, height / 2);
  rotate(anguloG);
  imageMode(CENTER);
  image(CapamanchaG, 0, 0);
  pop();

  push();
  translate(width / 2, height / 2);
  rotate(anguloN);
  imageMode(CENTER);
  image(CapamanchaN, 0, 0);
  pop();

  push();
  translate(width / 2, height / 2);
  rotate(anguloL);
  imageMode(CENTER);
  image(Capalineas, 0, 0);
  pop();
}

function actualizarCapa(tiempoTranscurrido) {
  let nuevaCapa = "";

  if (mouseY > 0 && mouseY < 183) {
    nuevaCapa = "N";
  } else if (mouseY > 366 && mouseY < 550) {
    nuevaCapa = "L";
  } else if (mouseY > 183 && mouseY < 366) {
    nuevaCapa = "G";
  }

  if (nuevaCapa !== capaActual) {
    capaActual = nuevaCapa;
    tiempoDentroCapa = 0; // Resetear el tiempo al cambiar de capa
  } else {
    tiempoDentroCapa += tiempoTranscurrido;
  }
}

function manejarManchas(manchas, ClaseMancha, imagenes, minSize, maxSize) {
  if (manchas.length === limiteImagenes) {
    // Iniciar el desvanecimiento de la mancha más antigua al alcanzar el límite
    manchas[0].desvanecer();
    if (manchas[0].opacidad <= 0) {
      manchas.shift(); // Elimina la mancha más antigua cuando sea completamente transparente
    }
  }

  if (manchas.length < limiteImagenes && tiempoDentroCapa >= tiempoRotacion) {
    let i = floor(random(cant));
    let w = random(minSize, maxSize);
    let h = random(minSize, maxSize);
    let x = random(0, width); // Generar posición aleatoria sin límites
    let y = random(0, height); // Generar posición aleatoria sin límites
    let velocidad = random(0.01, 0.05); // Velocidad aleatoria
    let nuevaMancha = new ClaseMancha(imagenes[i], x, y, w, h, velocidad);
    nuevaMancha.rotacionInicial = random(TWO_PI); // Asignar rotación inicial aleatoria
    manchas.push(nuevaMancha);
    tiempoDentroCapa = 0; // Resetear el tiempo al añadir una nueva mancha
  }
}

function dibujarManchas(capa, manchas) {
  capa.clear();
  for (let mancha of manchas) {
    mancha.dibujar(capa);
  }
}
