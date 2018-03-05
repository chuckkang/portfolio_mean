var express = require("express");
// var ejs = require("ejs");
var path = require("path");
var bodyParser = require("body-parser");
var aws = require('aws-sdk');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var bcrypt = require("bcrypt-as-promised");
var session = require("express-session");
app.use(session({ 
	secret: "s3cr3tappD4t4!",

	resave: true,
	saveUninitialized: false
}));
//static content
app.use(express.static(path.join(__dirname, "/public/dist")));

// for aws ses
// aws.config.loadFromPath(__dirname + '/config.json'); 
// var ses = new aws.SES();
//setup views folder
// app.set('views', path.join(__dirname, './client/views'));
// app.set('view engine', 'ejs');
// require the mongoose configuration file which does the rest for us
// require('./server/config/questionsdb.js');

require('./server/config/mongoose.js');
// require('./server/config/questionsdb.js');

var route = require("./server/config/routes.js")

route(app);
var routeNumber = 8000

var server = app.listen(routeNumber, function () {
	console.log("listening on port %s", routeNumber);
});


