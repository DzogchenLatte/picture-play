var ColorMap = JSON.parse(ColorMapData);

var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies
    Vector = Matter.Vector;

var worldWidth = 800;
var worldHeight = 600;
var xCenter = worldWidth / 2;
var yCenter = worldHeight / 2;

var maxColorValue = 48;
var myColorMap = ColorMap.jet;
var maxDistance = Math.sqrt(worldWidth*worldWidth + worldHeight*worldHeight);

var renderObject = {
	options: {
		width: worldWidth,
		height: worldHeight,
		wireframes: false,
		background: '#ffffff'
	}
};

var engine = Engine.create(document.body, {
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

var pinballRadius = 10;

var velocityVector = {
	x: 1,
	y: 0
};

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

var pinball = Bodies.circle(100, 100, pinballRadius, pinballParams);
Body.setVelocity(pinball, velocityVector);

generateSpiral(numCircles, spiralRate, radiusRate);
generateBounds();

World.add(engine.world, [pinball]);
console.log(pinball);
World.add(engine.world, circles);
World.add(engine.world, bounds);

engine.world.gravity.y = 0;
Engine.run(engine);

//artificially maintain velocity
setInterval(function() {
	var scaleFactor = 1 / pinball.speed;
	var newVector = {
		x: pinball.velocity.x * scaleFactor, 
		y: pinball.velocity.y * scaleFactor
	};

	Body.setVelocity(pinball, newVector);
	
}, 10);

setInterval(function() {
	var distance = Math.sqrt(pinball.position.x * pinball.position.x +
				   			 pinball.position.y * pinball.position.y);
	var colorInt = parseInt((distance / maxDistance) * maxColorValue);
	pinball.render.fillStyle = myColorMap[colorInt];
}, 200);


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


//for some reason, "top" === Window...not sure how that conflict arose or persisted
// var bottom = Bodies.rectangle(xCenter, worldHeight, worldWidth, 10, staticParams);
// var left = Bodies.rectangle(0, yCenter, 10, worldHeight, staticParams);
// var topBound = Bodies.rectangle(xCenter, 0, worldWidth, 10, staticParams);
// var right = Bodies.rectangle(worldWidth, yCenter, 10, worldHeight, staticParams);
// World.add(engine.world, [left, bottom, right, topBound]);

