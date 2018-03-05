var mongoose = require("mongoose")
var UsersDb = mongoose.model('Questions_Users')
var QuestionsDb = mongoose.model('Questions')
var bcrypt = require("bcrypt-as-promised")
var user = require("../models/questionsdb_user.js")
module.exports = {
	login: (req, res)=>{
		UsersDb.findOne({email: req.body.email}, (error, emailFound)=>{
			if (error) {
				// then check the hashed password:
				res.json({errors: error})
			} else {
				if (emailFound) {
					bcrypt.compare(req.body.password, emailFound.password)
							.then((result)=>{
								var fulluser = require("../models/questionsdb_user.js")
								fulluser.id = emailFound._id;
								fulluser.firstname = emailFound.firstname
								fulluser.lastname = emailFound.lastname
								fulluser.email = emailFound.email
								fulluser.dateofbirth = emailFound.dateofbirth
								fulluser.favoritequote = emailFound.favoritequote
								fulluser.totalposts = emailFound.totalposts
								fulluser.createdAt = emailFound.createdAt

								req.session.userId = emailFound._id
								res.json(fulluser)
							})
							.catch(
								// this section will execute if the passwords fail
								(error)=>{
									res.json({errors: error})
								}
							)
				} else {
					res.json({errors: "invalid"})
				}
			}})
	},
	register: (req, res)=>{
		if (req.body.email){
			// if there is a true email value then do the search
			UsersDb.find({ email: req.body.email }, (error, userdata) => {
				if (error) {
					console.log(error, "there was an error with the registration search")
					res.json({ errors: error })
				} else {
					if (userdata.length > 0) {
						// dupliicate
						res.json({ errors: "invalid" })
					} else {
						bcrypt.hash(req.body.password, 10).then(hashed_password => {
							var newUser = new UsersDb({
								firstname: req.body.firstname,
								lastname: req.body.lastname,
								email: req.body.email,
								password: hashed_password
							})
							//console.log(hashed_password, req.body.password, "--new password")
							newUser.save((error) => {
								if (error) {
									res.json({ errors: returnErrorMessage(error.errors) })
								} else {
									// then new user was saved successfully.
									//console.log(req.session._id, "session")
									res.json({ userId: req.session._id })
								}
							})
						})
					}
				}
			})
		} else {
			// email value is null
			res.json({errors: "Form is not complete."})
		}

	},
	verify: (req, res)=>{
		// verify:  this section will verify that the session still exists.
		// if the sesion does exist we will repopulate all the service data 
		// in the angular data service.
		let sessionid='';
		var userdata = user;
		var servicedata = {}
		servicedata.allquestions = [];
		servicedata.userdata = {};
		//req.session.userId = "5a68f4aed124c414542f0e3c";
		if (req.session.userId){
			UsersDb.findOne({ _id: req.session.userId }, (err, userdata) => {
				if (err) {
					// if there is an error with the backend:
					res.json({ errors: err })
				} else {
					if (userdata) {
						// if there is a user in the database
						servicedata.userdata = setUserData(userdata);
						// return all the question data
						let newQuestions = new QuestionsDb();
						newQuestions.getAllQuestionsWithUserData((results)=>{
							servicedata.allquestions = results
							res.json(servicedata)
						})
					} else {
						// then no record of session userid was found.
						req.session.destroy();
						res.json({ errors: "invalid" })
					}
				};
			})
		} else {
			res.json({errors: "invalid"})
		}

	},

	view: (req, res)=>{
		// req.session.userId ="5a68f4aed124c414542f0e3c";
		if (req.session.userId){
			UsersDb.findOne({ id: req.params.userId}, (err, userdata)=>{
				if (err) {
					res.json({errors: err})
				} else {
					console.log(userdata, "user on db")
					let getUser = setUserData(userdata);
					res.json(getUser)
				}
			})
		} else {
			//run logout function
			session.destroy();
			res.json({errors: "logout"})
		}
	},
	update: (req, res)=>{
		// must verify that the user updating equals the id
		//req.session.userId = "5a68f4aed124c414542f0e3c";
		if (req.session.userId==req.body.id) {
			UsersDb.update({ _id: req.body.id}, req.body, (err)=>{
					res.json(err ? {errors: err} : {success: true})
			})
		} else {
			console.log("not the same id")
			res.json({errors: "invalid update"})
		}
	},
	dbchanges: (req, res)=>{
		// this is just db testing area to run queries
		QuestionsDb.find({}, (err, result)=>{
			if (err) throw err;
			if (result){
				for(let q=0; q<result.length; q++){
					
				}
			}
		})
	}

}

var returnErrorMessage = function (value) {
	let errMessage;
	if (value.firstname) {
		rrMessage = value.firstname
	} else if (value.lastname) {
		errMessage = value.lastname.message
	} else if (value.email) {
		errMessage = value.email
	} else if (value.password) {
		errMessage = value.password.message
	} else if (value.favoritequote) {
		errMessage = value.favoritequote.message
	} else if (value.dateofbirth) {
		errMessage = value.dateofbirth.message
	} else if (value.totalposts) {
		errMessage = value.totalposts.message
	} else {
		errMessage = value
	}
	return errMessage
}

function setUserData(userData){
	var fulluser = require("../models/questionsdb_user.js")
	fulluser.id = userData.id;
	fulluser.firstname = userData.firstname
	fulluser.lastname = userData.lastname
	fulluser.email = userData.email
	fulluser.dateofbirth = userData.dateofbirth
	fulluser.favoritequote = userData.favoritequote
	fulluser.totalposts = userData.totalposts
	fulluser.createdAt = userData.createdAt
	return fulluser
}