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
	if (user_method === 'spotify-this-song' && user_input) {
		musicSearch(user_input);
	}
	else {
		var ace = [
			{
				type: 'track',
				query: 'The Sign'
			},
			{
				type: 'artist',
				query: 'Ace of Base'
			}
		];

		musicSearch(ace);
	}
};
function musicSearch(song) {
	spotify.search({
		type: 'track',
		query: song
	}, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		} else {
			var song = data.tracks.items[0];
			// console.log(JSON.stringify(data, null, 2));
			console.log("Here are the artist(s):")
			for (var i = 0; i < song.artists.length; i++) {
				console.log("\t" + song.artists[i].name);
			}
			console.log("Album name: " + song.album.name);
			console.log("Song name: " + song.name);
			console.log("Preview link: " + song.preview_url);
		}
	})
}



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
