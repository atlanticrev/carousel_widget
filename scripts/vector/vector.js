const canvasWidth = 700;
const canvasHeight = 500;

// Styles
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    #drawVector { 
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
canvas.id = 'drawVector';
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

const canvasRect = canvas.getBoundingClientRect();

const buffer = [];

// canvas.addEventListener('mousemove', (e) => {
//   let x = e.clientX - canvasRect.left;
//   let y = e.clientY - canvasRect.top;
//   buffer.push(x);
//   buffer.push(y);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//   ctx.beginPath();
//   for (let i = 0; i < buffer.length; i += 2) {
//     ctx.lineTo(buffer[i], buffer[i + 1]);
//   }
//   ctx.stroke();
//   ctx.closePath();
//   drawVector(x, y);
// });

function drawVector (x, y) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();

  // Arrow
  // const arrHeight = 5;
  // const arrWidth = 4;

  // const arrX = x - arrHeight;
  // const arrY = y - arrHeight;

  // ctx.beginPath();
  // ctx.moveTo(arrX, arrY);
  // ctx.lineTo(arrX + arrWidth / 2, arrX - arrWidth / 4);
  // ctx.lineTo(arrX - arrWidth / 2, arrX + arrWidth / 4);
  // ctx.lineTo(x, y);
  // ctx.fill();
  // ctx.closePath();
}

function drawCircle (vector, radius) {
  ctx.beginPath();
  ctx.arc(vector.x, vector.y, radius, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.closePath();
}

const circlePos = new Vector2D(50, 50);
const rotation = Matrix2D.createRotationMatrix(20);

for (let i = 0; i < 4; i++) {
  circlePos.applyMatrix2D(rotation);
  drawCircle(circlePos, 20);
}