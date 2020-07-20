/**
 * Initialization
 */
const canvasWidth = 700;
const canvasHeight = 500;

const X = 0;
const Y = 1;

// Styles
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
	canvas { 
		width: ${canvasWidth}px; 
		height: ${canvasHeight}px;
		background-color: white; 
	}

	#overlay {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
	}
`;
document.getElementsByTagName('head')[0].appendChild(style);

// Overlay
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

// Canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
overlay.appendChild(canvas);
ctx.canvas.width = `${canvasWidth}`;
ctx.canvas.height = `${canvasHeight}`;



/**
 * Drawing
 */
const canvasRect = canvas.getBoundingClientRect();

function drawCircle (x, y) {
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();
}

function applyRotationMatrix (vector, matrix) {
	return [
		vector[0] * matrix[0] + vector[1] * matrix[1],
		vector[0] * matrix[2] + vector[1] * matrix[3]
	];
}

// const initialCoords = [200, 200];

// drawCircle(initialCoords[0], initialCoords[1]);

// const beta = -20 / 180 * Math.PI;

// const rotationMatrix = [
//     Math.cos(beta), Math.sin(beta),
//     -Math.sin(beta), Math.cos(beta)
// ];

// const rotatedCoords = applyRotationMatrix(initialCoords, rotationMatrix);

// drawCircle(rotatedCoords[0], rotatedCoords[1]);

// const buffer = [];
canvas.addEventListener('mousemove', (e) => {
  let x = e.clientX - canvasRect.left;
  let y = e.clientY - canvasRect.top;
//   buffer.push(x);
//   buffer.push(y);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
//   for (let i = 0; i < buffer.length; i += 2) {
//     ctx.lineTo(buffer[i], buffer[i + 1]);
//   }
  ctx.stroke();
  ctx.closePath();
  drawVector(50, 50, x, y);
});

function drawVector (x1, y1, x2, y2) {
  // Styles
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';

  // Drawing
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();

  // Arrow
  const arrowHeight = 25;
  const arrowWidth = 16;

  const alpha = Math.atan2(y2 - y1, x2 - x1);
  console.log(alpha, alpha / Math.PI * 180);

  const arrowLeft = [x2 - arrowHeight, y2 - arrowWidth / 2];
  const arrowRight = [x2 - arrowHeight, y2 + arrowWidth / 2];

  console.log(...arrowLeft);

  const rotationMatrix = [
	Math.cos(alpha), Math.sin(alpha),
	-Math.sin(alpha), Math.cos(alpha)
];

ctx.save();
ctx.translate(x1, y1);
ctx.rotate(alpha);

const rotatedLeft = applyRotationMatrix(arrowLeft, rotationMatrix);
const rotatedRight = applyRotationMatrix(arrowRight, rotationMatrix);

console.log(...rotatedLeft);

ctx.beginPath();
ctx.moveTo(x2, y2);
// ctx.lineTo(rotatedLeft[X], rotatedLeft[Y]);
// ctx.lineTo(rotatedRight[X], rotatedRight[Y]);
ctx.lineTo(arrowLeft[X], arrowLeft[Y]);
ctx.lineTo(arrowRight[X], arrowRight[Y]);
ctx.lineTo(x2, y2);
ctx.fill();
ctx.closePath();

ctx.restore();
}

drawVector(50, 50, 200, 150);