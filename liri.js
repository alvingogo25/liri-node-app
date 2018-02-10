require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var user_method = process.argv[2];
var user_input = '';

function inputs() {
	for (var i = 3; i < process.argv.length; i++) {
		user_input += process.argv[i] + " "
	}
};

inputs();

if (user_method === 'my-tweets') {
	tweets();
}
if (user_method === 'spotify-this-song') {
	music();
}
if (user_method === 'movie-this') {
	movie();
}
if (user_method === 'do-what-it-says') {
	random();
}


function tweets() {
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
};


function music() {
	if (user_input) {
		musicSearch(user_input);
	} else {
		musicSearch("The Sign Ace of Base");
	}
};

function musicSearch(song) {
	spotify.search({
		type: 'track',
		query: song,
		limit: 5
	}, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		} else {
			var song = data.tracks.items;
			console.log("\nQuery Search: ", user_input);
			for (var j = 0; j < song.length; j++) {
				console.log("\nSong name: " + song[j].name);
				console.log("Artist(s):")
				for (var i = 0; i < song[j].artists.length; i++) {
					console.log("\t", song[j].artists[i].name);
				};
				console.log("Album name: " + song[j].album.name);
				console.log("Preview link: " + song[j].preview_url);
			};
		};
	})
};

function movie() {
	if (user_input) {
		movieSearch(user_input);
	} else {
		movieSearch('Mr. Nobody');
	}
};

function movieSearch(film) {
	request("http://www.omdbapi.com/?t=" + film + "&apikey=6f377c58", function(response, body) {
		// console.log(JSON.parse(body.body));
		var movieObj = JSON.parse(body.body);
		// console.log(obj);
		console.log("\nTitle:", movieObj.Title, "\nYear:", movieObj.Year, "\nIMDB Rating:", movieObj.imdbRating, "\nRotten Tomatoes Rating:", movieObj.Ratings[1].Value, "\nCountry:", movieObj.Country, "\nLanguage:", movieObj.Language, "\nPlot:", movieObj.Plot, "\nActors:", movieObj.Actors);
	});
}

function random() {

	console.log('calls command in random.txt');
};

var log = "\nMethod: " + user_method + " Query: " + user_input;
fs.appendFile('log.txt', log, function(err) {
	if (err) throw err;
});
