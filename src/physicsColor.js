var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies
    Vector = Matter.Vector;

var engine = Engine.create(document.body);

var circles = [];
var worldWidth = 800;
var worldHeight = 600;

var startRadius = 1;
var radiusRate = 20;
var numCircles = 100;
var spiralRate = 12;

var pinballRadius = 10;

var velocityVector = {
	x: 3,
	y: 0
};


var bottom = Bodies.rectangle(400, 610, 810, 60, {
	isStatic: true,
	friction: 0,
 	frictionStatic: 0,
 	frictionAir: 0
 });

var pinball = Bodies.circle(100, 100, pinballRadius, {
	friction: 0,
 	frictionStatic: 0,
 	frictionAir: 0
});

pinball.render.fillStyle = "#FF0000";
Body.setVelocity(pinball, velocityVector);

generateSpiral(numCircles, spiralRate, radiusRate);

World.add(engine.world, [bottom]);
World.add(engine.world, [pinball]);
World.add(engine.world, circles);

engine.world.gravity.y = 0;
Engine.run(engine);

function generateSpiral(numCircles, spiralRate, radiusRate) {
	var numRotations = 4;
	var totalRotation = 2 * Math.PI * numRotations;

	for (var i = 0; i < numCircles; i++) {
		var t = (i / numCircles) * totalRotation;
		var x =  spiralRate * t * Math.cos(t);
		var y =  spiralRate * t * Math.sin(t);
		var thisRadius = startRadius + radiusRate * (i / numCircles); 

		x += worldWidth / 2;
		y += worldHeight / 2;

		circles.push( Bodies.circle(x, y, thisRadius, {
			isStatic: true,
			friction: 0,
		 	frictionStatic: 0,
		 	frictionAir: 0
		 }) );
	}
	console.log(circles);
}
