// add required packages to project and import keys.js file
require("dotenv").config();

var axios = require("axios");
var moment = require("moment");


var keys = require("./keys.js");
var fs = require("fs");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// function to determine the input command and run the function matching that command
function chooseAppToRun() {

    // capture the input as either two or three input arguments
    var app = process.argv[2].trim();
    if (process.argv[3]) {
        var param = process.argv[3].trim();
    }

    // match the input with the function
    // if none, then display usage help
    switch (app) {
        case "my-tweets":
            getTweets();
            break;
        case "spotify-this-song":
            spotifySong(param);
            break;
        case "movie-this":
            getMovie(param);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Usage is my-tweets, spotify-this-song, movie-this, or do-what-it-says");
    }
}

// function to get tweets from Twitter
function getTweets() {

    // use statuses/user_timeline endpoint to connect to Twitter API
    client.get("statuses/user_timeline", { screen_name: "rmglennon" }, function (error, tweets, response) {

        if (error) {
            throw error;
        }
        // return 20 most recent tweets and timestamp
        for (var i = 0; i < 20; i++) {
            console.log("Tweet " + (i + 1) + ": " + tweets[i].text);
            console.log("Timestamp: " + tweets[i].created_at);
        };
    });
};

// function to get song information from Spotify
function spotifySong(param) {

    // song to search is input argument, if one is passed
    // if none, then set a default song to search
    var songQuery = param;

    if (!songQuery) {
        songQuery = "Ring the alarm";
    }

    // use tracks endpoint to search for a song on Spotify
    spotify.search({ type: "track", query: songQuery },

        function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err + ". You might try searching for another song title.");
            }

            var songName = data.tracks.items[0].name;
            var artist = data.tracks.items[0].artists[0].name;
            var album = data.tracks.items[0].album.name;
            var previewURL = data.tracks.items[0].preview_url;

            // print information about the song
            // add statements to check if tracks data exists before trying to display it. Not all songs or information is found, and not all songs are available to preview on Spotify. If that happens, the search results can return null values.
            if (artist) {
                console.log("Artist: " + artist);
            }
            if (songName) {
                console.log("Song: " + songName);
            }
            if (album) {
                console.log("Album: " + album);
            }
            if (previewURL) {
                console.log("Preview on Spotify: " + previewURL);
            }
        });
}


var request = require('request');
request('http://www.google.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});

// function to get movie information from OMDb
function getMovie(param) {

    // movie title to search is input argument, if one is passed
    // if none, then set a default movie to search
    var title = param;

    if (!title) {
        title = "Friday";
    }

    // use npm request package to make a request to OMDb for the input title
    request("http://www.omdbapi.com/?t=" + title + "&apikey=trilogy", function (error, response, body) {

        // if no error and HTTP code 200, then parse movie information
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year of release: " + JSON.parse(body).Year);
            console.log("IMDb rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country of origin: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

        }
    });
}

// function to run app based on contents of text file
function doWhatItSays() {

    var textFile = "random.txt";

    // use file system to read contents of random.txt
    fs.readFile(textFile, "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        // if a comma exists, split data by the comma and put into an array
        var dataArr = data.split(",");

        // run the function matching the command in the text file and pass any arguments
        var app = dataArr[0];
        if (dataArr[1]) {
            var param = dataArr[1];
        }

        // match the contents of the file with the function
        // if none, then display usage help
        switch (app) {
            case "my-tweets":
                getTweets();
                break;
            case "spotify-this-song":
                spotifySong(param);
                break;
            case "movie-this":
                getMovie(param);
                break;
            default:
                console.log("Make sure the file contains the proper usage for my-tweets, spotify-this-song, or movie-this.");
        }
    });
}

// start program by choosing which app to run
chooseAppToRun();