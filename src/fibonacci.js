var Jimp = require('jimp');
var BigNumber = require('bignumber.js');

//boring image generation
var width = 256;
var height = 256;
var maxColor = 0xFFFFFFFF;

//starting this at 0 leads the actual sequence in the code below
//i.e. it ends up listing as it should,  1, 1, 2, 3, 5 ...
var fibonacciPrevious = new BigNumber(0);
var fibonacciCurrent = new BigNumber(1);

var image = new Jimp(width, height, 0x00FFFF, function(error, image) {
	image.write( './myTestImage.png', function() {
		console.log('image save complete');
	})
});

var fibonacciImage = new Jimp(width, height, function(error, image) {
	for (var row = 0; row < width; row++) {
		console.log('writing row ', row);
		for (var col = 0; col < height; col++) {
			var colorValue = fibonacciCurrent.modulo(maxColor).toNumber();
			var currentCopy = new BigNumber(fibonacciCurrent);
			fibonacciCurrent = fibonacciPrevious.plus(fibonacciCurrent);
			fibonacciPrevious = currentCopy;

			image.setPixelColor(colorValue, row, col);
		}
	}

	image.write( './fibonacciGrid.png', function(error, image) {
		console.log('fibonacciGrid save complete');
	});

});

var randomImage = new Jimp(width, height, function(error, image) {
	for (var row = 0; row < width; row++) {
		console.log('writing row ', row);
		for (var col = 0; col < height; col++) {
			var colorValue = Math.floor(Math.random() * maxColor);
			image.setPixelColor(colorValue, row, col);
		}
	}

	image.write( './randomGrid.png', function(error, image) {
		console.log('randomGrid save complete');
	});

});