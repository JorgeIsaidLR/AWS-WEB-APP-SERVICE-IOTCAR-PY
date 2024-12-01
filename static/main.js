const canvasActions = {
  canvasTriArriba1: 'mover_adelante',
  canvasTriAbajo1: 'mover_atras',
  canvasTriDer1: 'vuelta_derecha',
  canvasTriIzq1: 'vuelta_izquierda',
  canvasId3: 'detener',
  canvasId: 'giro_90_der',
  canvasId2: 'giro_90_izq',
  miCanvas: 'giro_360_der',
  canvastrianguloIzq: 'giro_360_izq',
  myCanvas4: 'baile',
};

// Variable para almacenar el canvas seleccionado
let canvasSeleccionado = null;

// Configura los eventos de clic para cada canvas
for (const [canvasId, action] of Object.entries(canvasActions)) {
  const canvas = document.getElementById(canvasId);
  if (canvas) {
    canvas.addEventListener('click', () => {
      seleccionarCanvas(canvasId, action);
    });
  }
}

// Función para seleccionar y aplicar color rojo al canvas actual
function seleccionarCanvas(canvasId, action) {
  // Si hay un canvas previamente seleccionado, quita su superposición de color
  if (canvasSeleccionado) {
    limpiarSuperposicion(canvasSeleccionado);
  }

  // Aplica la superposición de color rojo al canvas seleccionado
  aplicarSuperposicion(canvasId, "rgba(255, 0, 0, 0.6)");

  // Llama a la función enviarAccion en index.js para manejar la acción
  enviarAccion(action);

  // Actualiza el canvas seleccionado
  canvasSeleccionado = canvasId;
}

// Aplica superposición de color al canvas sin modificar el dibujo base
function aplicarSuperposicion(canvasId, color) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

// Limpia la superposición y redibuja el canvas original
function limpiarSuperposicion(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  // Limpia el canvas para eliminar la superposición
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redibuja el canvas usando la función de dibujo correspondiente
  switch (canvasId) {
    case 'canvasTriArriba1':
      drawTri_Arriba_1_ConContorno(canvasId);
      break;
    case 'canvasTriAbajo1':
      drawTri_Abajo_1_ConContorno(canvasId);
      break;
    case 'canvasTriDer1':
      drawTri_Der_1_ConContorno(canvasId);
      break;
    case 'canvasTriIzq1':
      drawTri_Izq_1_ConContorno(canvasId);
      break;
    case 'canvasId3':
      drawMinimalistCircles(canvasId); // Agrega una función para este canvas si no la tienes
      break;
    // Añade otros casos según tus necesidades
    case 'miCanvas':
      drawCurvedArrowWithTriangle(canvasId);    //  : 'giro_360_der',
      break;
    case 'canvastrianguloIzq':
      drawCurvedArrowWithTriangle2(canvasId);
      break;
    case 'myCanvas4':
      drawRectangleButton(canvasId);
    //canvastrianguloIzq: 'giro_360_izq',
    //myCanvas4: 'baile',
  }
}


function drawRoundedTriangle(ctx, x1, y1, x2, y2, x3, y3, radius) {
  ctx.beginPath();

  // Punto 1 -> Punto 2
  ctx.moveTo(
    x1 + (x2 - x1) * radius,
    y1 + (y2 - y1) * radius
  );
  ctx.lineTo(
    x2 - (x2 - x1) * radius,
    y2 - (y2 - y1) * radius
  );

  // Curva en Punto 2 -> Punto 3
  ctx.quadraticCurveTo(x2, y2, x2 + (x3 - x2) * radius, y2 + (y3 - y2) * radius);

  // Punto 3 -> Punto 1
  ctx.lineTo(
    x3 - (x3 - x2) * radius,
    y3 - (y3 - y2) * radius
  );

  // Curva en Punto 3 -> Punto 1
  ctx.quadraticCurveTo(x3, y3, x3 + (x1 - x3) * radius, y3 + (y1 - y3) * radius);

  // Punto 1
  ctx.lineTo(
    x1 - (x1 - x3) * radius,
    y1 - (y1 - y3) * radius
  );

  // Curva en Punto 1 -> Punto 2
  ctx.quadraticCurveTo(x1, y1, x1 + (x2 - x1) * radius, y1 + (y2 - y1) * radius);

  ctx.closePath();
  ctx.fill();
}
// formato correcto TRIANGULO DERECHO
function drawTri_Der_1_ConContorno(canvasIdTri_Der_1) {
  const Tri_Der_1_canvas = document.getElementById(canvasIdTri_Der_1);
  const Tri_Der_1_ctx = Tri_Der_1_canvas.getContext("2d");
  const Tri_Der_1_width = Tri_Der_1_canvas.width;
  const Tri_Der_1_height = Tri_Der_1_canvas.height;

  // Tri_Der_1_ctx.fillRect(0, 0, Tri_Der_1_width, Tri_Der_1_height);

  const gradient = Tri_Der_1_ctx.createLinearGradient(0, 0, 0, Tri_Der_1_height);
  gradient.addColorStop(0, '#005EA3'); // Color inicial
  gradient.addColorStop(1, '#11A8FD'); // Color final
  
  // Tri_Der_1_ctx.fillRect(0, 0, Tri_Der_1_width, Tri_Der_1_height);

  // Coordenadas para triángulo hacia la derecha
  const Tri_Der_1_x1 = Tri_Der_1_width * 0.15, Tri_Der_1_y1 = Tri_Der_1_height * 0.12;
  const Tri_Der_1_x2 = Tri_Der_1_width * 0.15, Tri_Der_1_y2 = Tri_Der_1_height * 0.87;
  const Tri_Der_1_x3 = Tri_Der_1_width * 0.9, Tri_Der_1_y3 = Tri_Der_1_height * 0.5;

  // Triángulo exterior blanco
  Tri_Der_1_ctx.fillStyle = gradient;
  drawRoundedTriangle(Tri_Der_1_ctx, Tri_Der_1_x1, Tri_Der_1_y1, Tri_Der_1_x2, Tri_Der_1_y2, Tri_Der_1_x3, Tri_Der_1_y3, 0.25);
  Tri_Der_1_ctx.globalCompositeOperation = 'destination-out';
  // Triángulo interior hueco
  const Tri_Der_1_innerX1 = Tri_Der_1_width * 0.25, Tri_Der_1_innerY1 = Tri_Der_1_height * 0.3;
  const Tri_Der_1_innerX2 = Tri_Der_1_width * 0.25, Tri_Der_1_innerY2 = Tri_Der_1_height * 0.7;
  const Tri_Der_1_innerX3 = Tri_Der_1_width * 0.70, Tri_Der_1_innerY3 = Tri_Der_1_height * 0.5;

  drawRoundedTriangle(Tri_Der_1_ctx, Tri_Der_1_innerX1, Tri_Der_1_innerY1, Tri_Der_1_innerX2, Tri_Der_1_innerY2, Tri_Der_1_innerX3, Tri_Der_1_innerY3, 0);
  Tri_Der_1_ctx.globalCompositeOperation = 'source-over';
}

// Formato corecto TRIANGULO DERECHO
function drawTri_Izq_1_ConContorno(canvasIdTri_Izq_1) {
  const Tri_Izq_1_canvas = document.getElementById(canvasIdTri_Izq_1);
  const Tri_Izq_1_ctx = Tri_Izq_1_canvas.getContext("2d");
  const Tri_Izq_1_width = Tri_Izq_1_canvas.width;
  const Tri_Izq_1_height = Tri_Izq_1_canvas.height;

  // Fondo verde
  //Tri_Izq_1_ctx.fillStyle = "#00a77a";
  //Tri_Izq_1_ctx.fillRect(0, 0, Tri_Izq_1_width, Tri_Izq_1_height);

  const gradient = Tri_Izq_1_ctx.createLinearGradient(0, 0, 0, Tri_Izq_1_height);
  gradient.addColorStop(0, '#005EA3'); // Color inicial
  gradient.addColorStop(1, '#11A8FD'); // Color final

  // Coordenadas para triángulo hacia la izquierda
  const Tri_Izq_1_x1 = Tri_Izq_1_width * 0.85, Tri_Izq_1_y1 = Tri_Izq_1_height * 0.12;
  const Tri_Izq_1_x2 = Tri_Izq_1_width * 0.85, Tri_Izq_1_y2 = Tri_Izq_1_height * 0.87;
  const Tri_Izq_1_x3 = Tri_Izq_1_width * 0.05, Tri_Izq_1_y3 = Tri_Izq_1_height * 0.5;

  // Triángulo exterior blanco
  Tri_Izq_1_ctx.fillStyle = gradient;
   
  drawRoundedTriangle(Tri_Izq_1_ctx, Tri_Izq_1_x1, Tri_Izq_1_y1, Tri_Izq_1_x2, Tri_Izq_1_y2, Tri_Izq_1_x3, Tri_Izq_1_y3, 0.25);
  Tri_Izq_1_ctx.globalCompositeOperation = 'destination-out';

  // Triángulo interior hueco
  const Tri_Izq_1_innerX1 = Tri_Izq_1_width * 0.75, Tri_Izq_1_innerY1 = Tri_Izq_1_height * 0.3;
  const Tri_Izq_1_innerX2 = Tri_Izq_1_width * 0.75, Tri_Izq_1_innerY2 = Tri_Izq_1_height * 0.7;
  const Tri_Izq_1_innerX3 = Tri_Izq_1_width * 0.25, Tri_Izq_1_innerY3 = Tri_Izq_1_height * 0.5;

  // Tri_Izq_1_ctx.fillStyle = "#00a77a";
  drawRoundedTriangle(Tri_Izq_1_ctx, Tri_Izq_1_innerX1, Tri_Izq_1_innerY1, Tri_Izq_1_innerX2, Tri_Izq_1_innerY2, Tri_Izq_1_innerX3, Tri_Izq_1_innerY3, 0);
  Tri_Izq_1_ctx.globalCompositeOperation = 'source-over';

}

// formato correcto TRIANGULO ABAJO

function drawTri_Abajo_1_ConContorno(canvasIdTri_Abajo_1) {
  const Tri_Abajo_1_canvas = document.getElementById(canvasIdTri_Abajo_1);
  const Tri_Abajo_1_ctx = Tri_Abajo_1_canvas.getContext("2d");
  const Tri_Abajo_1_width = Tri_Abajo_1_canvas.width;
  const Tri_Abajo_1_height = Tri_Abajo_1_canvas.height;

  // Fondo verde
  // Tri_Abajo_1_ctx.fillStyle = "#00a77a";
  // Tri_Abajo_1_ctx.fillRect(0, 0, Tri_Abajo_1_width, Tri_Abajo_1_height);
  const gradient = Tri_Abajo_1_ctx.createLinearGradient(0, 0, 0, Tri_Abajo_1_height);
  gradient.addColorStop(0, '#005EA3'); // Color inicial
  gradient.addColorStop(1, '#11A8FD'); // Color final
  // Coordenadas para triángulo apuntando hacia abajo
  const Tri_Abajo_1_x1 = Tri_Abajo_1_width * 0.12, Tri_Abajo_1_y1 = Tri_Abajo_1_height * 0.15;
  const Tri_Abajo_1_x2 = Tri_Abajo_1_width * 0.85, Tri_Abajo_1_y2 = Tri_Abajo_1_height * 0.15;
  const Tri_Abajo_1_x3 = Tri_Abajo_1_width * 0.5, Tri_Abajo_1_y3 = Tri_Abajo_1_height * 0.90;

  // Triángulo exterior blanco
  Tri_Abajo_1_ctx.fillStyle = gradient;
  drawRoundedTriangle(Tri_Abajo_1_ctx, Tri_Abajo_1_x1, Tri_Abajo_1_y1, Tri_Abajo_1_x2, Tri_Abajo_1_y2, Tri_Abajo_1_x3, Tri_Abajo_1_y3, 0.25);
  Tri_Abajo_1_ctx.globalCompositeOperation = 'destination-out';
  // Triángulo interior hueco
  const Tri_Abajo_1_innerX1 = Tri_Abajo_1_width * 0.3, Tri_Abajo_1_innerY1 = Tri_Abajo_1_height * 0.25;
  const Tri_Abajo_1_innerX2 = Tri_Abajo_1_width * 0.7, Tri_Abajo_1_innerY2 = Tri_Abajo_1_height * 0.25;
  const Tri_Abajo_1_innerX3 = Tri_Abajo_1_width * 0.5, Tri_Abajo_1_innerY3 = Tri_Abajo_1_height * 0.70;

  // Tri_Abajo_1_ctx.fillStyle = "#00a77a";
  drawRoundedTriangle(Tri_Abajo_1_ctx, Tri_Abajo_1_innerX1, Tri_Abajo_1_innerY1, Tri_Abajo_1_innerX2, Tri_Abajo_1_innerY2, Tri_Abajo_1_innerX3, Tri_Abajo_1_innerY3, 0);
  Tri_Abajo_1_ctx.globalCompositeOperation = 'source-over';

}
// formato correcto TRIANGULO ARRIBA
function drawTri_Arriba_1_ConContorno(canvasIdTri_Arriba_1) {
  const Tri_Arriba_1_canvas = document.getElementById(canvasIdTri_Arriba_1);
  const Tri_Arriba_1_ctx = Tri_Arriba_1_canvas.getContext("2d");
  const Tri_Arriba_1_width = Tri_Arriba_1_canvas.width;
  const Tri_Arriba_1_height = Tri_Arriba_1_canvas.height;

  // Fondo verde
  // Tri_Arriba_1_ctx.fillStyle = "#00a77a";
  // Tri_Arriba_1_ctx.fillRect(0, 0, Tri_Arriba_1_width, Tri_Arriba_1_height);
  const gradient = Tri_Arriba_1_ctx.createLinearGradient(0, 0, 0, Tri_Arriba_1_height);
  gradient.addColorStop(0, '#005EA3'); // Color inicial
  gradient.addColorStop(1, '#11A8FD'); // Color final
  // Coordenadas para triángulo apuntando hacia arriba
  const Tri_Arriba_1_x1 = Tri_Arriba_1_width * 0.13, Tri_Arriba_1_y1 = Tri_Arriba_1_height * 0.82;
  const Tri_Arriba_1_x2 = Tri_Arriba_1_width * 0.87, Tri_Arriba_1_y2 = Tri_Arriba_1_height * 0.82;
  const Tri_Arriba_1_x3 = Tri_Arriba_1_width * 0.5, Tri_Arriba_1_y3 = Tri_Arriba_1_height * 0.03;

  // Triángulo exterior blanco
  Tri_Arriba_1_ctx.fillStyle = gradient;
  drawRoundedTriangle(Tri_Arriba_1_ctx, Tri_Arriba_1_x1, Tri_Arriba_1_y1, Tri_Arriba_1_x2, Tri_Arriba_1_y2, Tri_Arriba_1_x3, Tri_Arriba_1_y3, 0.25);
  Tri_Arriba_1_ctx.globalCompositeOperation = 'destination-out';

  // Triángulo interior hueco
  const Tri_Arriba_1_innerX1 = Tri_Arriba_1_width * 0.3, Tri_Arriba_1_innerY1 = Tri_Arriba_1_height * 0.7;
  const Tri_Arriba_1_innerX2 = Tri_Arriba_1_width * 0.7, Tri_Arriba_1_innerY2 = Tri_Arriba_1_height * 0.7;
  const Tri_Arriba_1_innerX3 = Tri_Arriba_1_width * 0.5, Tri_Arriba_1_innerY3 = Tri_Arriba_1_height * 0.3;

  // Tri_Arriba_1_ctx.fillStyle = "#00a77a";
  drawRoundedTriangle(Tri_Arriba_1_ctx, Tri_Arriba_1_innerX1, Tri_Arriba_1_innerY1, Tri_Arriba_1_innerX2, Tri_Arriba_1_innerY2, Tri_Arriba_1_innerX3, Tri_Arriba_1_innerY3, 0);
  Tri_Arriba_1_ctx.globalCompositeOperation = 'source-over';

}

// Llamada a la función para el canvas específico
drawTri_Arriba_1_ConContorno("canvasTriArriba1");
// Llamada a la función para el canvas abajo
drawTri_Abajo_1_ConContorno("canvasTriAbajo1");
// Llamada a la función para el canvas izquierda
drawTri_Izq_1_ConContorno("canvasTriIzq1");
// Llamada a la función para el canvas  derecha
drawTri_Der_1_ConContorno("canvasTriDer1");
// llamada a funcion para canvas arriba
// drawTrianguloConContorno();

// Función para dibujar el triángulo redondeado
function drawRoundedTriangleHead(ctx, x1, y1, x2, y2, x3, y3, radius) {
  ctx.beginPath();

  if (radius > 0) {
    // Triángulo con bordes redondeados
    ctx.moveTo(
      x1 + (x2 - x1) * radius,
      y1 + (y2 - y1) * radius
    );
    ctx.lineTo(
      x2 - (x2 - x1) * radius,
      y2 - (y2 - y1) * radius
    );

    ctx.quadraticCurveTo(x2, y2, x2 + (x3 - x2) * radius, y2 + (y3 - y2) * radius);

    ctx.lineTo(
      x3 - (x3 - x2) * radius,
      y3 - (y3 - y2) * radius
    );

    ctx.quadraticCurveTo(x3, y3, x3 + (x1 - x3) * radius, y3 + (y1 - y3) * radius);

    ctx.lineTo(
      x1 - (x1 - x3) * radius,
      y1 - (y1 - y3) * radius
    );

    ctx.quadraticCurveTo(x1, y1, x1 + (x2 - x1) * radius, y1 + (y2 - y1) * radius);
  } else {
    // Triángulo sin bordes redondeados
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
  }

  ctx.fill();
}

// Flecha hacia derecha
function drawCurvedArrowWithTriangle(canvastrianguloDer) {
  const canvas = document.getElementById(canvastrianguloDer);
  if (!canvas) {
    console.error(`Canvas with ID '${canvastrianguloDer}' not found.`);
    return;
  }
  const ctx = canvas.getContext('2d');

  // Color de fondo del canvas
  // ctx.fillStyle = "#00a77a";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#005EA3'); // Color inicial
  gradient.addColorStop(1, '#11A8FD'); // Color final
  // Centro y radio del arco
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const arcRadius = Math.min(centerX, centerY) - 20;

  // Ángulo de inicio y fin del arco en radianes
  const arcStartAngle = Math.PI * 0.125;
  const arcEndAngle = Math.PI * 1.89;

  // Dibujar el arco de la flecha
  ctx.beginPath();
  ctx.arc(centerX, centerY, arcRadius, arcStartAngle, arcEndAngle);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 20;
  ctx.stroke();

  // Coordenadas finales del arco para el triángulo
  const triangleCenterX = centerX + arcRadius * Math.cos(arcEndAngle - 0.2);
  const triangleCenterY = centerY + arcRadius * Math.sin(arcEndAngle);

  // Parámetros del triángulo exterior (blanco)
  const outerTriangleSize = 30; // Tamaño del triángulo blanco
  const triangleAngleOffset = arcEndAngle - 0.1; // Alinear el triángulo con el ángulo de la flecha

  // Coordenadas de los tres puntos del triángulo blanco
  const outerX1 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset);
  const outerY1 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset);
  const outerX2 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset + (2 * Math.PI) / 3);
  const outerY2 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset + (2 * Math.PI) / 3);
  const outerX3 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset + (4 * Math.PI) / 3);
  const outerY3 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset + (4 * Math.PI) / 3);

  // Dibujar el triángulo exterior redondeado (blanco)
  ctx.fillStyle = gradient;
  drawRoundedTriangleHead(ctx, outerX1, outerY1, outerX2, outerY2, outerX3, outerY3, 0.16);
  ctx.globalCompositeOperation = 'destination-out';
  // Parámetros del triángulo interior (verde)
  const innerTriangleSize = 20; // Tamaño del triángulo verde (más pequeño que el blanco)

  // Coordenadas de los tres puntos del triángulo verde
  const innerX1 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset);
  const innerY1 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset);
  const innerX2 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset + (2 * Math.PI) / 3);
  const innerY2 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset + (2 * Math.PI) / 3);
  const innerX3 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset + (4 * Math.PI) / 3);
  const innerY3 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset + (4 * Math.PI) / 3);

  // Dibujar el triángulo interior redondeado (verde)
  // ctx.fillStyle = '#00a77a';
  drawRoundedTriangleHead(ctx, innerX1, innerY1, innerX2, innerY2, innerX3, innerY3, 0);
  ctx.globalCompositeOperation = 'source-over';
}

function drawCurvedArrowWithTriangle2(canvastrianguloIzq) {
  const canvas = document.getElementById(canvastrianguloIzq);
  if (!canvas) {
    console.error(`Canvas with ID '${canvastrianguloIzq}' not found.`);
    return;
  }
  const ctx = canvas.getContext('2d');

  // Color de fondo del canvas
  //ctx.fillStyle = "#00a77a";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#005EA3'); // Color inicial
  gradient.addColorStop(1, '#11A8FD'); // Color final
  // Centro y radio del arco
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const arcRadius = Math.min(centerX, centerY) - 20;

  // Invertir el ángulo de inicio y fin del arco en radianes
  const arcStartAngle = Math.PI * 0.875; // Ajuste para que comience del lado opuesto
  const arcEndAngle = -Math.PI * 0.89;   // Ajuste para que termine en el otro extremo

  // Dibujar el arco de la flecha
  ctx.beginPath();
  ctx.arc(centerX, centerY, arcRadius, arcStartAngle, arcEndAngle, true);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 20;
  ctx.stroke();

  // Coordenadas finales del arco para el triángulo (nuevo ángulo final)
  const triangleCenterX = centerX + arcRadius * Math.cos(arcEndAngle + 0.2);
  const triangleCenterY = centerY + arcRadius * Math.sin(arcEndAngle + 0.1);

  // Parámetros del triángulo exterior (blanco)
  const outerTriangleSize = 30; // Tamaño del triángulo blanco
  const triangleAngleOffset = arcEndAngle + 0.15; // Alinear el triángulo con el ángulo de la flecha

  // Coordenadas de los tres puntos del triángulo blanco (invertidos)
  const outerX1 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset);
  const outerY1 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset);
  const outerX2 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset + (2 * Math.PI) / 3);
  const outerY2 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset + (2 * Math.PI) / 3);
  const outerX3 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset + (4 * Math.PI) / 3);
  const outerY3 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset + (4 * Math.PI) / 3);

  // Dibujar el triángulo exterior redondeado (blanco)
  ctx.fillStyle = gradient;
  drawRoundedTriangleHead(ctx, outerX1, outerY1, outerX2, outerY2, outerX3, outerY3, 0.16);
  ctx.globalCompositeOperation = 'destination-out';
  // Parámetros del triángulo interior (verde)
  const innerTriangleSize = 20; // Tamaño del triángulo verde (más pequeño que el blanco)

  // Coordenadas de los tres puntos del triángulo verde (invertidos)
  const innerX1 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset);
  const innerY1 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset);
  const innerX2 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset + (2 * Math.PI) / 3);
  const innerY2 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset + (2 * Math.PI) / 3);
  const innerX3 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset + (4 * Math.PI) / 3);
  const innerY3 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset + (4 * Math.PI) / 3);

  // Dibujar el triángulo interior redondeado (verde)
  //ctx.fillStyle = "transparent";
  drawRoundedTriangleHead(ctx, innerX1, innerY1, innerX2, innerY2, innerX3, innerY3, 0);
  ctx.globalCompositeOperation = 'source-over';
}

// Llamada a la función para el canvas específico
drawCurvedArrowWithTriangle2("canvastrianguloIzq");

function drawRightAngleArrowWithTriangle(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with ID '${canvasId}' not found.`);
    return;
  }
  const ctx = canvas.getContext('2d');

  // Color de fondo del canvas
  ctx.fillStyle = "#00a77a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Coordenadas de inicio y longitud de las líneas
  const startX = canvas.width / 4;
  const startY = canvas.height / 3;
  const verticalLength = canvas.height / 2;
  const horizontalLength = canvas.width / 2;

  // Dibujar la línea vertical de la flecha
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX, startY + verticalLength);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Dibujar la línea horizontal de la flecha
  ctx.beginPath();
  ctx.moveTo(startX - 10, startY); // Cambia aquí para comenzar en el inicio de la línea vertical
  ctx.lineTo((startX) + horizontalLength, startY); // Mantén la misma altura que el inicio de la línea vertical
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Coordenadas para centrar el triángulo en el final de la línea horizontal
  const triangleCenterX = startX + horizontalLength;
  const triangleCenterY = startY;

  // Ángulo del triángulo para apuntar hacia la derecha
  const triangleAngleOffset = 0; // 0 radianes para apuntar a la derecha

  // Tamaños de los triángulos (exterior e interior)
  const outerTriangleSize = 30;
  const innerTriangleSize = 20;

  // Coordenadas del triángulo exterior (blanco)
  const outerX1 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset);
  const outerY1 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset);
  const outerX2 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset + (2 * Math.PI) / 3);
  const outerY2 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset + (2 * Math.PI) / 3);
  const outerX3 = triangleCenterX + outerTriangleSize * Math.cos(triangleAngleOffset + (4 * Math.PI) / 3);
  const outerY3 = triangleCenterY + outerTriangleSize * Math.sin(triangleAngleOffset + (4 * Math.PI) / 3);

  // Dibujar el triángulo exterior redondeado (blanco)
  ctx.fillStyle = 'white';
  drawRoundedTriangle(ctx, outerX1, outerY1, outerX2, outerY2, outerX3, outerY3, 0.16);

  // Coordenadas del triángulo interior (verde)
  const innerX1 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset);
  const innerY1 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset);
  const innerX2 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset + (2 * Math.PI) / 3);
  const innerY2 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset + (2 * Math.PI) / 3);
  const innerX3 = triangleCenterX + innerTriangleSize * Math.cos(triangleAngleOffset + (4 * Math.PI) / 3);
  const innerY3 = triangleCenterY + innerTriangleSize * Math.sin(triangleAngleOffset + (4 * Math.PI) / 3);

  // Dibujar el triángulo interior redondeado (verde)
  ctx.fillStyle = '#00a77a';
  drawRoundedTriangle(ctx, innerX1, innerY1, innerX2, innerY2, innerX3, innerY3, 0);
}


function drawLeftAngleArrowWithTriangle(canvasId2) {
  const canvas = document.getElementById(canvasId2);
  if (!canvas) {
    console.error(`Canvas with ID '${canvasId2}' not found.`);
    return;
  }
  const ctx = canvas.getContext('2d');

  // Color de fondo del canvas
  ctx.fillStyle = "#00a77a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Coordenadas de inicio y longitud de las líneas
  const startXLeft = canvas.width * 3 / 4; // Cambiado para reflejar la flecha
  const startYLeft = canvas.height / 3;
  const verticalLengthLeft = canvas.height / 2;
  const horizontalLengthLeft = canvas.width / 2;

  // Dibujar la línea vertical de la flecha
  ctx.beginPath();
  ctx.moveTo(startXLeft, startYLeft);
  ctx.lineTo(startXLeft, startYLeft + verticalLengthLeft);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Dibujar la línea horizontal de la flecha
  ctx.beginPath();
  ctx.moveTo(startXLeft + 10, startYLeft); // Cambiado para comenzar en el final de la línea vertical
  ctx.lineTo(startXLeft - horizontalLengthLeft, startYLeft); // Reflejado para ir hacia la izquierda
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Coordenadas para centrar el triángulo en el final de la línea horizontal
  const triangleCenterXLeft = startXLeft - horizontalLengthLeft; // Cambiado para reflejar la posición
  const triangleCenterYLeft = startYLeft;

  // Ángulo del triángulo para apuntar hacia la izquierda
  const triangleAngleOffsetLeft = Math.PI; // 180 grados para apuntar a la izquierda

  // Tamaños de los triángulos (exterior e interior)
  const outerTriangleSizeLeft = 30;
  const innerTriangleSizeLeft = 20;

  // Coordenadas del triángulo exterior (blanco)
  const outerX1Left = triangleCenterXLeft + outerTriangleSizeLeft * Math.cos(triangleAngleOffsetLeft);
  const outerY1Left = triangleCenterYLeft + outerTriangleSizeLeft * Math.sin(triangleAngleOffsetLeft);
  const outerX2Left = triangleCenterXLeft + outerTriangleSizeLeft * Math.cos(triangleAngleOffsetLeft + (2 * Math.PI) / 3);
  const outerY2Left = triangleCenterYLeft + outerTriangleSizeLeft * Math.sin(triangleAngleOffsetLeft + (2 * Math.PI) / 3);
  const outerX3Left = triangleCenterXLeft + outerTriangleSizeLeft * Math.cos(triangleAngleOffsetLeft + (4 * Math.PI) / 3);
  const outerY3Left = triangleCenterYLeft + outerTriangleSizeLeft * Math.sin(triangleAngleOffsetLeft + (4 * Math.PI) / 3);

  // Dibujar el triángulo exterior redondeado (blanco)
  ctx.fillStyle = 'white';
  drawRoundedTriangle(ctx, outerX1Left, outerY1Left, outerX2Left, outerY2Left, outerX3Left, outerY3Left, 0.16);

  // Coordenadas del triángulo interior (verde)
  const innerX1Left = triangleCenterXLeft + innerTriangleSizeLeft * Math.cos(triangleAngleOffsetLeft);
  const innerY1Left = triangleCenterYLeft + innerTriangleSizeLeft * Math.sin(triangleAngleOffsetLeft);
  const innerX2Left = triangleCenterXLeft + innerTriangleSizeLeft * Math.cos(triangleAngleOffsetLeft + (2 * Math.PI) / 3);
  const innerY2Left = triangleCenterYLeft + innerTriangleSizeLeft * Math.sin(triangleAngleOffsetLeft + (2 * Math.PI) / 3);
  const innerX3Left = triangleCenterXLeft + innerTriangleSizeLeft * Math.cos(triangleAngleOffsetLeft + (4 * Math.PI) / 3);
  const innerY3Left = triangleCenterYLeft + innerTriangleSizeLeft * Math.sin(triangleAngleOffsetLeft + (4 * Math.PI) / 3);

  // Dibujar el triángulo interior redondeado (verde)
  ctx.fillStyle = '#00a77a';
  drawRoundedTriangle(ctx, innerX1Left, innerY1Left, innerX2Left, innerY2Left, innerX3Left, innerY3Left, 0);
}

// formato correcto CIRCULO
function drawMinimalistCircles(canvasId3) {
  const canvas = document.getElementById(canvasId3);
  if (!canvas) {
    console.error(`Canvas with ID '${canvasId3}' not found.`);
    return;
  }

  const ctx = canvas.getContext('2d');

  // Asegurar que el canvas sea cuadrado (tomamos el valor menor entre el ancho y alto)
  const size = Math.min(canvas.width, canvas.height);
  canvas.width = size;  // Establecer el canvas como cuadrado


  // Color de fondo del canvas
  //ctx.fillStyle = "#00a77a"; // Color de fondo
  //ctx.fillRect(0, 0, size, size); // Rellenar el fondo

  // Propiedades del círculo sólido
  const centerX = size / 2;
  const centerY = size / 2;
  const solidCircleRadius = size * 0.35; // Radio del círculo sólido (40% del tamaño del canvas)

  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#005EA3'); // Color inicial (en el centro del círculo)
  gradient.addColorStop(1, '#11A8FD'); // Color final (en el borde del círculo)

  // Dibujar el círculo sólido
  ctx.beginPath();
  ctx.arc(centerX, centerY, solidCircleRadius, 0, 2 * Math.PI); // Dibuja el círculo
  ctx.fillStyle = gradient; // Color del círculo sólido
  ctx.fill(); // Rellenar el círculo
  ctx.closePath();

  // Propiedades del círculo con borde
  const borderCircleRadius = solidCircleRadius + size * 0.05; // Radio del círculo con borde (añadir 10% al radio)

  // Dibujar el círculo con borde
  ctx.beginPath();
  ctx.arc(centerX, centerY, borderCircleRadius, 0, 2 * Math.PI); // Dibuja el borde
  ctx.strokeStyle = gradient; // Color del borde
  ctx.lineWidth = size * 0.05; // Grosor del borde (10% del tamaño del canvas)
  ctx.stroke(); // Dibuja el borde
  ctx.closePath();
}

// fORMATP CPRRECTO BOTON BAILE
function drawRectangleButton(myCanvas4) {
  const canvas = document.getElementById(myCanvas4);
  if (!canvas) {
    console.error(`Canvas with ID '${myCanvas4}' not found.`);
    return;
  }
  const ctx = canvas.getContext('2d');

  // Color de fondo del canvas
  //ctx.fillStyle = "#00a77a"; // Color de fondo
  //ctx.fillRect(0, 0, canvas.width, canvas.height); // Rellenar el fondo

  // Propiedades del botón
  const buttonX = canvas.width / 8; // Posición X del botón
  const buttonY = canvas.height / 3; // Posición Y del botón
  const buttonWidth = canvas.width * 0.75; // Ancho del botón (más grande)
  const buttonHeight = canvas.height / 4; // Alto del botón (más largo)
  const borderRadius = 20; // Radio para esquinas redondeadas

// Crear un gradiente lineal para el botón
const gradient = ctx.createLinearGradient(buttonX, buttonY, buttonX + buttonWidth, buttonY + buttonHeight); 
gradient.addColorStop(0, '#005EA3'); // Color inicial (arriba)
gradient.addColorStop(1, '#11A8FD'); // Color final (abajo)


  // Dibujar sombra
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Color de la sombra
  ctx.shadowBlur = 10; // Difuminado de la sombra
  ctx.shadowOffsetX = 5; // Desplazamiento de la sombra en X
  ctx.shadowOffsetY = 5; // Desplazamiento de la sombra en Y

  // Dibujar el botón
  ctx.fillStyle = gradient; // Color del botón
  ctx.beginPath();
  ctx.moveTo(buttonX + borderRadius, buttonY); // Esquina superior izquierda
  ctx.lineTo(buttonX + buttonWidth - borderRadius, buttonY); // Esquina superior derecha
  ctx.quadraticCurveTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + borderRadius); // Esquina redondeada derecha
  ctx.lineTo(buttonX + buttonWidth, buttonY + buttonHeight - borderRadius); // Esquina inferior derecha
  ctx.quadraticCurveTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX + buttonWidth - borderRadius, buttonY + buttonHeight); // Esquina redondeada inferior derecha
  ctx.lineTo(buttonX + borderRadius, buttonY + buttonHeight); // Esquina inferior izquierda
  ctx.quadraticCurveTo(buttonX, buttonY + buttonHeight, buttonX, buttonY + buttonHeight - borderRadius); // Esquina redondeada inferior izquierda
  ctx.lineTo(buttonX, buttonY + borderRadius); // Esquina superior izquierda
  ctx.quadraticCurveTo(buttonX, buttonY, buttonX + borderRadius, buttonY); // Esquina redondeada superior izquierda
  ctx.closePath();
  ctx.fill(); // Rellenar el botón

  // Borrar sombra para otros dibujos
  ctx.shadowColor = "transparent";

  // Dibujar el contorno del botón
  ctx.strokeStyle = gradient; // Color del contorno
  ctx.lineWidth = 4; // Grosor del contorno
  ctx.stroke(); // Dibujar el contorno
}


// Llama a la función cuando se carga el documento
window.onload = function () {
  drawRectangleButton('myCanvas4');
  drawMinimalistCircles('canvasId3');
  drawLeftAngleArrowWithTriangle('canvasId2');
  drawCurvedArrowWithTriangle('miCanvas'); // Llama a la función pasando el ID del canvas
  drawRightAngleArrowWithTriangle("canvasId");
};






