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
// music();
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
	if (user_method === 'spotify-this-song' && !user_input){
		var ace = [{
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
			var song = data.tracks.items;
			console.log("\nQuery Search: ", user_input);
			for (var j = 0; j < song.length; j++) {
				console.log("\nHere are the artist(s):")
				for (var i = 0; i < song[j].artists.length; i++) {
					console.log("\t" + song[j].artists[i].name);
				}
				console.log("Album name: " + song[j].album.name);
				console.log("Song name: " + song[j].name);
				console.log("Preview link: " + song[j].preview_url);
			}
		}
	})
}



function movie() {
	if (user_method === 'movie-this' && user_input) {
		console.log(process.argv[3])
		request("http://www.omdbapi.com/?t=" + user_input + "&apikey=6f377c58", function (response, body) {
			console.log(body.body)
		})
	} else {
		console.log('Mr. Nobody');
	}
};



function random() {
	if (user_method === 'do-what-it-says') {
		console.log('calls command in random.txt');
	}
};
