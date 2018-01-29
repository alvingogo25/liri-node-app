require("dotenv").config();
var keys = require('/.keys.js');

if (process.argv[2] === 'my-tweets') {
	console.log('show tweets');
};

if (process.argv[2] === 'spotify-this-song') {
	console.log('name this song');
};

if (process.argv[2] === 'movie-this') {
	if (process.argv[3]) {
		console.log(process.argv[3])
	} else {
		console.log('Mr. Nobody');
	}
};

if (process.argv[2] === 'do-what-it-says') {
	console.log('calls command in random.txt');
}
