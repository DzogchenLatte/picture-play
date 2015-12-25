var Jimp = require('jimp');

var width;
var height;

//fileName is the image file with the .jpg extension
function averagePicture(fileName) {
	Jimp.read('img/' + fileName + '.jpg', function(error, image) {
		if (error) throw error;

		width = image.bitmap.width;
		height = image.bitmap.height;
		var xNumChunks = 450;
		var yNumChunks = 225;
		var xChunkSize = width / xNumChunks;
		var yChunkSize = height / yNumChunks;

		for (var i = 0; i < xNumChunks; i++) {
			for (var j = 0; j < yNumChunks; j++) {
				var bounds = {
					xLowerBound: clamp(i * xChunkSize, 0, width - 1),
					xUpperBound: clamp((i + 1) * xChunkSize, 0, width - 1),
					yLowerBound: clamp(j * yChunkSize, 0, height - 1),
					yUpperBound: clamp((j + 1) * yChunkSize, 0, height - 1)
				};

				var averageColor = getChunkAverage(image, bounds);
				setChunkColor(image, bounds, averageColor);
			}
		}

		image.write('./' + fileName + '_average.jpg', function(error, image) {
			console.log("averaged picture complete", fileName);
		});
	});
};

function getChunkAverage(image, bounds) {
	var chunkColors = []
	for (var x = bounds.xLowerBound; x < bounds.xUpperBound; x++) {
		for (var y = bounds.yLowerBound; y < bounds.yUpperBound; y++) {
			chunkColors.push(image.getPixelColor(x, y));
		}
	}

	return averageArray(chunkColors);
}

function setChunkColor(image, bounds, color) {
	for (var x = bounds.xLowerBound; x < bounds.xUpperBound; x++) {
		for (var y = bounds.yLowerBound; y < bounds.yUpperBound; y++) {
			image.setPixelColor(color, x, y);
		}
	}
}

function averageArray(myArray) {
	var total = 0;
	for (var i = 0; i < myArray.length; i++) {
		total += myArray[i];
	}

	return total / myArray.length;
}

//Clamp the value to be between lowerBound or upperBound
function clamp(value, lowerBound, upperBound) {
	return Math.max(lowerBound, Math.min(upperBound, value));
}

averagePicture('myTestImage');
averagePicture('Jesus');
averagePicture('thangka')