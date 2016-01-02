
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies
    Vector = Matter.Vector;

var worldWidth = 800;
var worldHeight = 600;
var xCenter = worldWidth / 2;
var yCenter = worldHeight / 2;

var imageSize = 40;
var canvasLineWidth = 10;
var canvasCurrentcolor;
var canvasImageSize = 400;
var numShades = 128;

var timeLimit = 5000;
var trialDelay = 1000;

//how many ms have elapsed in the current trial
var currentTrialTime = 0;
var trialStartTime;

var intervalId;

var myColorMap = cmap({
	colormap: 'jet', 
	nshades: numShades,
	format: 'hex'
});

var maxDistance = Math.sqrt(xCenter*xCenter + yCenter*yCenter);

var renderObject = {
	options: {
		width: worldWidth,
		height: worldHeight,
		wireframes: false,
		background: '#ffffff'
	}
};

var engine = Engine.create(document.getElementById('physicsContainer'), {
	render: renderObject,
	velocityIterations: 10
});

engine.world.bounds.min.x = -Infinity;
engine.world.bounds.min.y = -Infinity;
engine.world.bounds.max.x = Infinity;
engine.world.bounds.max.y = Infinity;

var circles = [];
var bounds = [];

var startRadius = 1;
var radiusRate = 20;
var numCircles = 80;
var spiralRate = 11;

var pinballRadius = 6;
var pinballSpeed = 5;

var simulationCounter = 0;

var origin = {
	x: 0,
	y: 0
};

var staticParams = {
	isStatic: true,
	friction: 0,
 	frictionStatic: 0,
 	frictionAir: 0,
 	restitution: 1,
 	render: {
 		fillStyle: 'transparent',
 		strokeStyle: '#000000',
 		lineWidth: 10
 	}
};

var pinballParams = {
	friction: 0,
 	frictionStatic: 0,
 	frictionAir: 0,
 	restitution: 1,
 	inertia: Infinity,
 	render: {
 		lineWidth: 2,
 		fillStyle: "#000000",
 		strokeStyle: '#000000'
 	}
 };

 var xPinballStart = xCenter;
 var yPinballStart = yCenter;

var pinball = Bodies.circle(xPinballStart, yPinballStart, pinballRadius, pinballParams);

// generateSpiral(numCircles, spiralRate, radiusRate);
generateBounds();
World.add(engine.world, [pinball]);
World.add(engine.world, circles);
World.add(engine.world, bounds);

function generateSpiral(numCircles, spiralRate, radiusRate) {
	var numRotations = 4;
	var totalRotation = 2 * Math.PI * numRotations;

	for (var i = 0; i < numCircles; i++) {
		var t = (i / numCircles) * totalRotation;
		var x = spiralRate * t * Math.cos(t);
		var y = spiralRate * t * Math.sin(t);
		var thisRadius = startRadius + radiusRate * (i / numCircles); 

		x += xCenter;
		y += yCenter / 2 + 170;

		circles.push( Bodies.circle(x, y, thisRadius, staticParams) );
	}
}

function generateBounds() {
	var boundRadius = 30;

	for (var i = 0; i < 50; i++) {
		var x = (i / 50) * worldWidth;
		var y = worldHeight;
		bounds.push( Bodies.circle(x, y, boundRadius, staticParams));
	}

	for (var i = 0; i < 50; i++) {
		var x = (i / 50) * worldWidth;
		var y = 0;
		bounds.push( Bodies.circle(x, y, boundRadius, staticParams));
	}

	for (var i = 0; i < 50; i++) {
		var x = 0;
		var y = (i / 50) * worldHeight;
		bounds.push( Bodies.circle(x, y, boundRadius, staticParams));
	}

	for (var i = 0; i < 50; i++) {
		var x = worldWidth;
		var y = (i / 50) * worldHeight;
		bounds.push( Bodies.circle(x, y, boundRadius, staticParams));
	}
}
