var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine = Engine.create(document.body);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
var circles = [];

var worldWidth = 800;
var worldHeight = 600;

var startRadius = 1;
var radiusRate = 20;
var numCircles = 100;
var spiralRate = 12;

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

		circles.push( Bodies.circle(x, y, thisRadius, {isStatic: true}) );
	}
	console.log(circles);
}

console.log(ground);

generateSpiral(numCircles, spiralRate, radiusRate);
World.add(engine.world, [ground]);
World.add(engine.world, circles);
Engine.run(engine);