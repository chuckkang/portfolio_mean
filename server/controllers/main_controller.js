
var mongoose = require("mongoose");
var AppointmentDB = mongoose.model('Appointment');
var User = mongoose.model('User');

// var newuser = require("../models/user.js").User

module.exports = {
	index: (req, res) => {
	},

	add: (req, res) => {
		console.log(req.body, "req body")
		var newappointment = new AppointmentDB(req.body);
		newappointment.save((err) => {
			if (err) { res.json({ message: err + "Error inserting record" })}
			else {	res.json({ message: "success" })}
		})
	},

	single: (req, res) => {
		AppointmentDB.findOne({_id: req.params.id}, function (err, singleAppointment) {
			if (err) { res.json(err)} 
			else { res.json(singleAppointment);	}
		})
	},

	all: (req, res) => {
		var curDate = new Date();
		AppointmentDB.find({ fulldate : {$gt: curDate}}, function (err, results) {
			if (err) {res.json(err)	} 
			else {	res.json(results);}
		})
	},

	edit: (req, res) => {
		// on update pass in the id
		// then pass in keyvalue pairs from the req.bod
		AppointmentDB.update({ id: req.body.id }, req.body, function (err, results) {
			if (err) {
				console.log(err, "there is an error")
				res.json({error: err})
			} else {res.json(results);}
		})
	}, 

	verifyLogin: (req, res) => {
		// console.log(req.body, "req.body   dsfasdf")
		// this route will check if there is a session key available. 
		// if there is no sessionkey then the session has been logged out.
		
		// when creating a new instance of the db model a userid is automatically generated.
		var checkUser = require("../models/qppointmentsdb_user.js")
		//console.log(req.session, "sessiona----------------------------------")
		if (req.session._id){
			// console.log("THere is _id")
			checkUser.username = req.session.username
			checkUser.id = req.session._id
			checkUser.email = req.session.email
		} else {
			checkUser.username = ""
			checkUser.id = ""
			checkUser.email = ""
			req.session.destroy()
		}
		res.json(checkUser)
	},

	logout: (req, res) => {
		// this route will check if there is a session key available. 
		// if there is no sessionkey then the session has been logged out.
		req.session.destroy()
		res.json({logout: true})
		// console.log("were in loggeda out")
		
	},

	login: (req, res) => {
		//console.log(req.session.username, req.session.id, "this is the session data")
		User.findOne({ username: req.body.username }, function (err, results) {
			if (err) {
				// this is a system error from the db.
				res.json({error: "There was an error: " + err})
			} else {
				if (results){
					// record was found.
					req.session.username = results.username
					req.session._id = results.id
					req.session.email = results.email
					results.id = results._id //add an _id to the dictionary for easier access on the front end
					res.json(results);
				}
				else{
					//record was not found.  Create new record
					var newUser = new User(); // when creating new instance of model, id is automatically generated.
					newUser.username = req.body.username;
					newUser.email = req.body.email;
					newUser.sessiontime = new Date();
					newUser.save((result) => {
						User.findOne({id: newUser.id}, function(err, user) {
							if (err){
								//console.log(err, "error")
								res.json({error: err})
							} else {
								req.session.username = newUser.username
								req.session._id = newUser.id
								req.session.user = newUser
								res.json(user)
							}
						})
					})
				}
			}
		}
		)
	}, 

	delete: (req, res) => {
		// console.log({id: req.params.questionid}, "THIS IS ID from the question and answers router");
		//console.log(req.params.id, "request params in controller");
		// res.json({message: "on server"})
		if (req.session._id){
			AppointmentDB.remove({ _id: req.params.id }, function (err) {
				if (err) {
					res.json(err)
				} else {
					//console.log("successful removal");
					res.json( {deleted : req.params.id })
				}
			});
		} else {
			// session does not exist...return nothing
			res.json({invalid : "invalid session"})
		}
	},

}
