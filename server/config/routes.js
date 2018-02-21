//////  ROUTES
var controller = require('../controllers/main_controller.js');
var questionsController = require("../controllers/questionsdb_questions_controller.js")
var answersController = require("../controllers/questionsdb_answers_controller.js")
var usersController = require("../controllers/questionsdb_users_controller.js")
var path = require('path');
// var Survey = mongoose.model('surveys');
module.exports = function Route(app) {
	app.get("/", controller.index),
	app.get("/all", controller.all), //showall appointments
	app.post("/add/new", controller.add),
	app.put("/edit", controller.edit),
	app.get("/show/:id", controller.single),
	app.delete("/delete/:id", controller.delete),
	app.post("/login", controller.login),
	app.post("/verifyLogin", controller.verifyLogin),

	// questionsdb
	app.get("/qapp/index", questionsController.index),
	app.post("/qapp/login", usersController.login)
	app.post("/qapp/register", usersController.register),
	app.get("/qapp/verifysession", usersController.verify),
	app.post("/qapp/add", questionsController.add),
	app.delete("/qapp/question/delete/:questionid", questionsController.delete),
	app.post("/qapp/answer/addsingle/:questionid", answersController.addsingle),
	app.post("/qapp/answer/add/:questionid", answersController.add),
	//app.get("/qapp/answer/:questionId", answersController.get),
	app.delete("/qapp/question/:questionid/answer/delete/:answerid/:userid", answersController.delete),
	app.put("/qapp/user/update", usersController.update),
	app.post("/logout", controller.logout),
	app.get("/qapp/user/:userid", usersController.view)
	app.get("/qapp/admin", usersController.dbchanges)
	app.get("/qapp/test", questionsController.test),
	app.all("*", (req, res, next) => {
		res.sendFile(path.resolve("./public/dist/index.html"));
	});
	//////////////////////////////////////////////
}