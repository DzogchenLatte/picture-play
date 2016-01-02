var imageCanvas;
var xLastDraw = 0;

function createCanvas() {
	imageCanvas = document.createElement('canvas');
	imageCanvas.width = canvasImageSize;
	imageCanvas.height = canvasImageSize;
	imageCanvas.style.position = 'relative';
	document.getElementById('physicsContainer').appendChild(imageCanvas);
}

//Progress is elapsed time / trial time
function drawLine() {
	var x = (currentTrialTime / timeLimit) * canvasImageSize;
	if (x - xLastDraw < 5) return;

	var context = imageCanvas.getContext('2d');
	var y = simulationCounter * canvasLineWidth;

	context.beginPath();
	context.lineWidth = canvasLineWidth;
	context.moveTo(xLastDraw, y);
	context.lineTo(x, y);
	context.strokeStyle = canvasCurrentColor;
	context.stroke();
	context.closePath();
	xLastDraw = x;
}

createCanvas();