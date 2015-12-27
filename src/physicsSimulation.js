//artificially maintain velocity
function updatePinball() {
	var scaleFactor = pinballSpeed / pinball.speed;
	var newVector = {
		x: pinball.velocity.x * scaleFactor, 
		y: pinball.velocity.y * scaleFactor
	};

	Body.setVelocity(pinball, newVector);
	setPinballColor();
} 

function setPinballColor() {
	var dx = pinball.position.x - xCenter;
	var dy = pinball.position.y - yCenter;
	var distance = Math.sqrt(dx*dx + dy*dy);
	var colorVal = parseInt((distance / maxDistance) * numShades);

	pinball.render.fillStyle = myColorMap[colorVal];
}

function prepareNextRun() {
	if ( simulationCounter == imageSize ) {
		clearInterval(intervalId);
		console.log('simulation complete');
		return;
	}
	intervalId = setInterval(updatePinball, 10);

	var angle = (simulationCounter / imageSize ) * (2 * Math.PI);
	var velocity = {
		x: pinballSpeed * Math.cos(angle),
		y: pinballSpeed * Math.sin(angle)
	};

	Body.setVelocity(pinball, velocity);
	engine.world.gravity.y = 0;

	setTimeout(resetPinball, timeLimit);
	setTimeout(prepareNextRun, trialDelay + timeLimit)

	simulationCounter++;
}

function resetPinball() {
	World.remove(engine.world, pinball);
	pinball = Bodies.circle(xPinballStart, yPinballStart, pinballRadius, pinballParams);
	
	Body.setVelocity(pinball, {x: .01, y: 0.01});
	setPinballColor();
	World.add(engine.world, [pinball]);
	
	clearInterval(intervalId);
}

prepareNextRun();
Engine.run(engine);

