require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var user_method = process.argv[2];
var user_input = process.argv[3];

tweets();
music();
movie();
random();

function tweets() {
	if (user_method === 'my-tweets') {
		var params = {
			screen_name: 'go_alvin_go'
		};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
				// console.log(tweets);
				for (var i = 0; i < tweets.length; i++) {
					console.log((i + 1) + '. ' + tweets[i].text);
				}
			}
		});
	}
};


function music() {
	if (user_method === 'spotify-this-song') {
		spotify.search({
			type: 'track',
			query: user_input
		}, function(err, data) {
			if (err) {
				console.log('Error occurred: ' + err);
				return;
			} else {
				// console.log(JSON.stringify(data, null, 2));
				console.log(data.tracks.items[0].album.name);
			}
		})
	}
};



function movie() {
	if (user_method === 'movie-this') {
		if (process.argv[3]) {
			console.log(process.argv[3])
		} else {
			console.log('Mr. Nobody');
		}
	};
};

function random() {
	if (user_method === 'do-what-it-says') {
		console.log('calls command in random.txt');
	}
};
