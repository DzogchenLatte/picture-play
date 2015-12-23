var Jimp = require('jimp');

var image = new Jimp(256, 256, 0x00FFFF, function(error, image) {
	image.write( './myTestImage.png', function() {
		console.log('image save complete');
	})
});