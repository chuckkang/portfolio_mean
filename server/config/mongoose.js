var mongoose = require("mongoose");
// var q_mongoose = require("mongoose")


var fs = require('fs');
var path = require("path")
// change the db to the correct db
mongoose.connect('mongodb://localhost/mean_final_3'); // add new db here
// q_mongoose.connect("mongodb://localhost/questions")

var models_path = path.join(__dirname, '../models');
// mongoose.Promise = global.Promise;

fs.readdirSync(models_path).forEach(function (file) {
	if (file.indexOf('.js') >= 0) {
		// require the file (this runs the model file which registers the schema)
		require(models_path + '/' + file);
	}
});