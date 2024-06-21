/*
// Avances hasta 12.06.2024 
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

  CapamanchaG = createGraphics(300, 550);
  CapamanchaN = createGraphics(300, 550);
  Capalineas = createGraphics(300, 550);
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
  } else if (capaActual === "L") {
    manejarManchas(manchasLineas, Linea, lineas, 100, 250);
  } else if (capaActual === "G") {
    manejarManchas(manchasG, ManchaG, manchaG, 250, 450);
  }

  // Dibujar las manchas en sus capas
  dibujarManchas(CapamanchaN, manchasN);
  dibujarManchas(CapamanchaG, manchasG);
  dibujarManchas(Capalineas, manchasLineas);

  // Dibujar las capas en el canvas principal
  image(CapamanchaG, 0, 0);
  image(CapamanchaN, 0, 0);
  image(Capalineas, 0, 0);
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
    if (capaActual !== "") {
      // Detener la rotación de la mancha en la capa anterior
      detenerRotacionMancha(capaActual);
    }
    capaActual = nuevaCapa;
    tiempoDentroCapa = 0; // Resetear el tiempo al cambiar de capa
  } else {
    tiempoDentroCapa += tiempoTranscurrido;
  }
}

function detenerRotacionMancha(capa) {
  if (capa === "N" && manchasN.length > 0) {
    manchasN[manchasN.length - 1].stopRotating();
  } else if (capa === "L" && manchasLineas.length > 0) {
    manchasLineas[manchasLineas.length - 1].stopRotating();
  } else if (capa === "G" && manchasG.length > 0) {
    manchasG[manchasG.length - 1].stopRotating();
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

  if (manchas.length < limiteImagenes) { // Verificar que no haya mas de 5 manchas
    if (tiempoDentroCapa >= tiempoRotacion) {
      if (manchas.length > 0) {
        manchas[manchas.length - 1].startRotating();
      }
    }

    if (manchas.length === 0 || tiempoDentroCapa === 0) {
      let i = floor(random(cant));
      let w = random(minSize, maxSize);
      let h = random(minSize, maxSize);
      let x = random(0, width - 10 - w); // Evitar que se corte la imagen en el borde derecho
      let y = random(0, height - 10 - h); // Evitar que se corte la imagen en el borde de abajo
      let velocidad = random(0.01, 0.05); // Velocidad aleatoria
      let nuevaMancha = new ClaseMancha(imagenes[i], x, y, w, h, velocidad);
      manchas.push(nuevaMancha);
    }
  }
}

function dibujarManchas(capa, manchas) {
  capa.clear();
  for (let mancha of manchas) {
    mancha.dibujar(capa);
  }
}
*/
/*
let CapamanchaG;
let CapamanchaN;
let Capalineas;
let Capafondo;
let fondo; // Variable para la imagen de fondo
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

// CONFIG VOLUMEN
let amp_min = 0.01;
let amp_media = 0.1;
let amp_max = 0.2;
// MICROFONO
let mic;
// AMPLITUD (volumen)
let amp;
// variable de sonido
let haySonidoMin = false;
let haySonidoMedia = false;
let haySonidoMax = false;
let antesHabiaSonidoMin = false; // memoria de estado haySonido un fotograma atras
let antesHabiaSonidoMedia = false; // memoria de estado haySonido un fotograma atras
let antesHabiaSonidoMax = false; // memoria de estado haySonido un fotograma atras

// Declare empezoElSonido as a global variable
let empezoElSonidoMin = false;
let empezoElSonidoMedia = false;
let empezoElSonidoMax = false;

// Gestor
let gestorAmp;
let amortiguacion = 0.9;

let imprimir = true;

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
  createCanvas(550, 800);
  mic = new p5.AudioIn();
  mic.start();
  Capafondo = createGraphics(550, 800); // Crear capa para la imagen de fondo
  Capafondo.image(fondo, 0, 0, 550, 800); // Dibujar la imagen de fondo en la capa

  // GESTOR 
  gestorAmp = new GestorSenial(amp_min, amp_max); // gestor con umbral mininmo y maximo

  gestorAmp.f = amortiguacion;
  CapamanchaG = createGraphics(550, 800);
  CapamanchaN = createGraphics(550, 800);
  Capalineas = createGraphics(550, 800);
}

function draw() {
  background(200);

  gestorAmp.actualizar(mic.getLevel());
  amp = gestorAmp.filtrada;

  haySonidoMin = amp > amp_min;
  haySonidoMedia = amp > amp_media;
  haySonidoMax = amp > amp_max;
  empezoElSonidoMin = haySonidoMin && !antesHabiaSonidoMin;
  empezoElSonidoMedia = haySonidoMedia && !antesHabiaSonidoMedia;
  empezoElSonidoMax = haySonidoMax && !antesHabiaSonidoMax;

  image(Capafondo, 0, 0); // Dibujar la capa de fondo

  let tiempoTranscurrido = millis() - tiempoAnterior;
  tiempoAnterior = millis();

  actualizarCapa(tiempoTranscurrido);

  // Manejar las manchas para cada capa
  if (capaActual === "N") {
    manejarManchas(manchasN, ManchaN, manchaN, 150, 250);
  } else if (capaActual === "L") {
    manejarManchas(manchasLineas, Linea, lineas, 100, 250);
  } else if (capaActual === "G") {
    manejarManchas(manchasG, ManchaG, manchaG, 250, 450);
  }

  // Dibujar las manchas en sus respectivas capas
  dibujarManchas(CapamanchaN, manchasN);
  dibujarManchas(CapamanchaG, manchasG);
  dibujarManchas(Capalineas, manchasLineas);

  // Dibujar las capas en el canvas principal
  image(CapamanchaG, 0, 0);
  image(CapamanchaN, 0, 0);
  image(Capalineas, 0, 0);

  // Update antesHabiaSonido at the end of draw
  antesHabiaSonidoMin = haySonidoMin;
  antesHabiaSonidoMedia = haySonidoMedia;
  antesHabiaSonidoMax = haySonidoMax;
}

function actualizarCapa(tiempoTranscurrido) {
  let nuevaCapa = "";

  if (empezoElSonidoMax) {
    nuevaCapa = "N";
  } else if (empezoElSonidoMedia) {
    nuevaCapa = "G";
  } else if (empezoElSonidoMin) {
    nuevaCapa = "L";
  }

  if (nuevaCapa !== capaActual) {
    if (capaActual !== "") {
      detenerRotacionMancha(capaActual);
    }
    capaActual = nuevaCapa;
    tiempoDentroCapa = 0; // Resetear el tiempo al cambiar de capa
  } else {
    tiempoDentroCapa += tiempoTranscurrido;
  }
}

function detenerRotacionMancha(capa) {
  if (capa === "N" && manchasN.length > 0) {
    manchasN[manchasN.length - 1].stopRotating();
  } else if (capa === "L" && manchasLineas.length > 0) {
    manchasLineas[manchasLineas.length - 1].stopRotating();
  } else if (capa === "G" && manchasG.length > 0) {
    manchasG[manchasG.length - 1].stopRotating();
  }
}

function manejarManchas(manchas, ClaseMancha, imagenes, minSize, maxSize) {
  if (manchas.length === limiteImagenes) {
    manchas[0].desvanecer();
    if (manchas[0].opacidad <= 0) {
      manchas.shift();
    }
  }

  if (manchas.length < limiteImagenes) {
    if (tiempoDentroCapa >= tiempoRotacion) {
      if (manchas.length > 0) {
        manchas[manchas.length - 1].startRotating();
      }
    }

    if (manchas.length === 0 || tiempoDentroCapa === 0) {
      let i = floor(random(cant));
      let x = random(0, width); // Random Y
      let y = random(0, height); // Ramdom  X
      let velocidad = random(0.01, 0.05); // Velocidad aleatoria
      let nuevaMancha = new ClaseMancha(imagenes[i], x, y, w, h, velocidad);
      manchas.push(nuevaMancha);
    }
  }
}

function dibujarManchas(capa, manchas) {
  capa.clear();
  for (let mancha of manchas) {
    mancha.dibujar(capa);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function printData() {
  gestorAmp.dibujar(100, 500);
}
*/
/*
//  Ya no se usan PNG entonces no hay arreglos para cargarlos
let CapamanchaG;
let CapamanchaN;
let Capalineas;
let Capafondo;
let fondo;  // Por las dudas, un arreglo del fondo
let cant = 5;
let tiempoDentroCapa = 0;
let tiempoAnterior = 0;
let tiempoRotacion = 2000; // 2 segundos
let capaActual = "";
let limiteImagenes = 5;
let manchasG = []; // Este arreglo se usa para almacenar y manejar las manchas que se dibujan en la capa 
let manchasN = []; // Este arreglo se usa para almacenar y manejar las manchas que se dibujan en la capa 
let manchasLineas = []; // Este arreglo se usa para almacenar y manejar las manchas que se dibujan en la capa 

function preload() {
  fondo = loadImage("data/Lienzo2.png"); // Cargar la imagen de fondo
}

function setup() {
  createCanvas(300, 550);
  Capafondo = createGraphics(300, 550);
  Capafondo.image(fondo, 0, 0, 300, 550);

  CapamanchaG = createGraphics(300, 550);
  CapamanchaN = createGraphics(300, 550);
  Capalineas = createGraphics(300, 550);
}

function draw() {
  background(200);
  image(Capafondo, 0, 0); // Dibujar la capa de fondo

  let tiempoTranscurrido = millis() - tiempoAnterior;
  tiempoAnterior = millis();

  actualizarCapa(tiempoTranscurrido);

  // Limpiar las capas gráficas antes de dibujar las manchas
  CapamanchaG.clear();
  CapamanchaN.clear();
  Capalineas.clear();

  // Manejar las manchas para cada capa
  if (capaActual === "N") {
    manejarManchas(manchasN, ManchaN, 50, 50); // Ultimos 2 parametros dan el tamaño
  } else if (capaActual === "L") {
    manejarManchas(manchasLineas, Linea, 100, 250); // Ultimos 2 parametros dan el tamaño
  } else if (capaActual === "G") {
    manejarManchas(manchasG, ManchaG, 80, 80); // Ultimos 2 parametros dan el tamaño
  }

  // Dibujar las manchas en sus capas
  dibujarManchas(CapamanchaN, manchasN);
  dibujarManchas(CapamanchaG, manchasG);
  dibujarManchas(Capalineas, manchasLineas);

  // Dibujar las capas en el canvas principal
  image(CapamanchaG, 0, 0);
  image(CapamanchaN, 0, 0);
  image(Capalineas, 0, 0);
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
    if (capaActual !== "") {
      // Detener la rotación de la mancha en la capa anterior
      detenerRotacionMancha(capaActual);
    }
    capaActual = nuevaCapa;
    tiempoDentroCapa = 0; // Resetear el tiempo al cambiar de capa
  } else {
    tiempoDentroCapa += tiempoTranscurrido;
  }
}

function detenerRotacionMancha(capa) {
  if (capa === "N" && manchasN.length > 0) {
    manchasN[manchasN.length - 1].stopRotating();
  } else if (capa === "L" && manchasLineas.length > 0) {
    manchasLineas[manchasLineas.length - 1].stopRotating();
  } else if (capa === "G" && manchasG.length > 0) {
    manchasG[manchasG.length - 1].stopRotating();
  }
}

function manejarManchas(manchas, ClaseMancha, minSize, maxSize) {
  // Verifica si el número de manchas ha alcanzado el límite definido por limiteImagenes
  if (manchas.length === limiteImagenes) {
    // Inicia el proceso de desvanecimiento para la mancha más antigua
    manchas[0].desvanecer();
    // Si la opacidad de la mancha más antigua es menor o igual a 0, la elimina del arreglo
    if (manchas[0].opacidad <= 0) {
      manchas.shift();
    }
  }

  // Si el número de manchas es menor que el límite definido
  if (manchas.length < limiteImagenes) {
    // Verifica si ha pasado el tiempo suficiente (tiempoRotacion) dentro de la capa
    if (tiempoDentroCapa >= tiempoRotacion) {
      // Si hay al menos una mancha en el arreglo, empieza a rotar la más reciente
      if (manchas.length > 0) {
        manchas[manchas.length - 1].startRotating();
      }
    }

    // Si no hay manchas o si acaba de cambiar de capa (tiempoDentroCapa es 0)
    if (manchas.length === 0 || tiempoDentroCapa === 0) {
      // Genera una nueva mancha con una posición y velocidad aleatorias
      let x = random(0, width); // Posición x aleatoria
      let y = random(0, height); // Posición y aleatoria
      let velocidad = random(0.01, 0.05); // Velocidad aleatoria
      let nuevaMancha = new ClaseMancha(x, y, minSize, maxSize, velocidad); // Crea una nueva mancha
      manchas.push(nuevaMancha); // Agrega la nueva mancha al arreglo
    }
  }
}

function dibujarManchas(capa, manchas) {
  for (let mancha of manchas) {
    mancha.dibujar(capa);
  }
}
*/

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
