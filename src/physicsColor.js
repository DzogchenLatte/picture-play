var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies
    Vector = Matter.Vector;

var worldWidth = 800;
var worldHeight = 600;
var xCenter = worldWidth / 2;
var yCenter = worldHeight / 2;

var renderObject = {
	options: {
		width: worldWidth,
		height: worldHeight
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

var startRadius = 1;
var radiusRate = 20;
var numCircles = 100;
var spiralRate = 12;

var pinballRadius = 5;

var velocityVector = {
	x: 6,
	y: 6
};

var staticParams = {
	isStatic: true,
	friction: 0,
 	frictionStatic: 0,
 	frictionAir: 0,
 	restitution: 1
};

//for some reason, "top" === Window...not sure how that conflict arose or persisted
var bottom = Bodies.rectangle(xCenter, worldHeight, worldWidth, 10, staticParams);
var left = Bodies.rectangle(0, yCenter, 10, worldHeight, staticParams);
var topBound = Bodies.rectangle(xCenter, 0, worldWidth, 10, staticParams);
var right = Bodies.rectangle(worldWidth, yCenter, 10, worldHeight, staticParams);

var pinball = Bodies.circle(100, 100, pinballRadius, {
	friction: 0,
 	frictionStatic: 0,
 	frictionAir: 0,
 	restitution: 1,
 	inertia: Infinity
});

pinball.render.fillStyle = "#FF0000";
Body.setVelocity(pinball, velocityVector);

generateSpiral(numCircles, spiralRate, radiusRate);

World.add(engine.world, [left, bottom, right, topBound]);
World.add(engine.world, [pinball]);
World.add(engine.world, circles);

engine.world.gravity.y = 0;
Engine.run(engine);

//artificially maintain velocity
setInterval(function() {
	pinball.Inertia = Infinity;
}, 10);

setInterval(function() {
	console.log(pinball);
}, 1000);

function generateSpiral(numCircles, spiralRate, radiusRate) {
	var numRotations = 4;
	var totalRotation = 2 * Math.PI * numRotations;

	for (var i = 0; i < numCircles; i++) {
		var t = (i / numCircles) * totalRotation;
		var x =  spiralRate * t * Math.cos(t);
		var y =  spiralRate * t * Math.sin(t);
		var thisRadius = startRadius + radiusRate * (i / numCircles); 

		x += xCenter;
		y += yCenter / 2 + 170;

		circles.push( Bodies.circle(x, y, thisRadius, {
			isStatic: true,
			friction: 0,
		 	frictionStatic: 0,
		 	frictionAir: 0,
		 	restitution: 1
		 }) );
	}
	console.log(circles);
}
