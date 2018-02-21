var mongoose = require("mongoose");
var fs = require('fs');
var path = require("path")
// change the db to the correct db
mongoose.connect('mongodb://localhost/questions'); // add new db here
var models_path = path.join(__dirname, '../models');
// mongoose.Promise = global.Promise;

fs.readdirSync(models_path).forEach(function (file) {
	if (file.indexOf('questionsdb') >= 0) {
		// require the file (this runs the model file which registers the schema)
		console.log(file, "this is teh models files")
		require(models_path + '/' + file);
	}
});