var imageCanvas;
var xLastDraw = 0;
var yLastDraw = 0;

function createCanvas() {
	imageCanvas = document.createElement('canvas');
	imageCanvas.width = imageCanvasSize;
	imageCanvas.height = imageCanvasSize;
	imageCanvas.style.position = 'relative';
	document.getElementById('physicsContainer').appendChild(imageCanvas);
}

//Progress is elapsed time / trial time
function drawLine(row, progress, color) {
	var context = imageCanvas.getContext('2d');
	// var newX = progress * /

	context.lineWidth = canvasLineWidth;
	context.moveTo(xLastDraw, row * canvasLineWidth)
	context.lineTo(x, y);
	context.stroke();
	// xLastDraw = 
}

createCanvas();