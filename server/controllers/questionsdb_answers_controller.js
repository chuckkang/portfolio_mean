var mongoose = require("mongoose");
var QuestionsDb = mongoose.model('Questions');
var AnswersDb = mongoose.model('Answers')
var UsersDb = mongoose.model('Questions_Users')



module.exports = {
	addsingle: (req, res) => {
		//console.log(req.params.questionid)
		//console.log(req.body, "THIS IS TEH BODY")
		
		QuestionsDb.findOne({_id: req.params.questionid}, function(error, questiondata){
			//console.log(req.params.questionid, "req.params.questionid")
			if (error){
				console.log("there was an error")
				res.json({errors: error})
			} else {
				var newAnswer = new AnswersDb(req.body)
				newAnswer.save((error)=>{
					if (error) {
						res.json(error)
					} else {
						questiondata.answers.unshift(newAnswer);
						//console.log(questiondata.answers, "ANSWERS ARRAY")
						questiondata.save(error=>{
							if (error){
								console.log(error, "Error during save")
								res.json(error)
							} else {
								let getQuestions = new QuestionsDb();
								getQuestions.getAllQuestionsWithUserData((getQuestions)=>{
									console.log(getQuestions, "getQuestios in db")
									res.json(getQuestions)
								})
							}
						})
					}
				})
			}
		})
	},

	add: (req, res) => {
		//console.log(req.params.questionid)
		// this add is essentially the same as the addsingle, however, the data sent over will be different.
		// this add will find a user's session and add the remaining data on teh backend
		// instead of sending over all the user data ie- name, userid, we will check
		// to make sure the session is active and then gather all datafirst before 
		// the update is made.
		// verify that the user is active
		//console.log(req.session.userId)
		UsersDb.findOne({ _id: req.session.userId }, (err, userData) => {
			if (err) {
				//console.log("User IS NOT Found")
				res.json({ errors: err })
			} else {
				if (userData) {
					addAnswer(req, res, userData, (allQuestions)=>{
						res.json(allQuestions)
					});
				} else {
					// if no records are found it will return null
					//console.log(userData, "NOT Found user data")
					res.json({ errors: "user is not found" })
				}
			}
		})


		//res.json('finished')
	},

	delete: (req, res) => {
		let questionId = req.params.questionid;
		let answerId = req.params.answerid;
		let userId = req.params.userid
		let jsondata;
		//console.log(questionId, answerId, userId, "from the querystring")
		//make sure session is valid:
		if (req.session.userId===userId){
			// session is goood
			//console.log('good')
			QuestionsDb.findOne({ _id: questionId }).populate('answers').exec( function (err, question){
				if (err) throw err;
				if (question) {
					// if there are records found then keep going
					for (let i = 0; i < question.answers.length; i++){
						//console.log(question.answers[i]._id)
						if (question.answers[i]._id==answerId){
							question.answers.splice(i, 1)
							AnswersDb.remove({_id : answerId }, (err)=>{
								if (err) {
									jsondata = { errors: err }
								} else {
									returnAllQuestions(req, res, (getQuestions)=>{
										jsondata = getQuestions
										res.json(jsondata)
									})
								}
							})
						}
						if (jsondata) {
							break;
						}
					}
				} else {
					// if no records are found, then send back error emssage
					jsondata = { errors: { message: "No question by this id was found." } }
				}
				
			})
		} else {
			jsondata = {errors: {message: "Session is invalid to delete answer."}}
			res.json(jsondata)
		}
		
	}
}

addAnswer = function (req, res, userData, allQuestions) {
	// this will add an answer to the database and will return a refreshed list of answers.
	QuestionsDb.findOne({ _id: req.params.questionid }, function (error, questiondata) {
		//console.log(req.params.questionid, "req.params.questionid")
		if (error) {
			//console.log("there was an error")
			res.json({ errors: error })
		} else {
			//console.log(userData, "THIS IS All THE DUASER DATA")
			var newAnswer = new AnswersDb()
			newAnswer._questionId = req.body._questionId
			newAnswer.userId = userData._id
			newAnswer.username = userData.firstname + " " + userData.lastname
			newAnswer.answer = req.body.answer

			newAnswer.save((error) => {
				if (error) {
					console.log(error, "error during saving of ")
					res.json(error)
				} else {
					// console.log(questiondata.answers, "new answer array")
					questiondata.answers.unshift(newAnswer);
					
					questiondata.save(error => {
						if (error) {
							console.log(error, "Error during save")
							res.json(error)
						} else {
							let returnAll = new QuestionsDb();
							returnAll.getAllQuestionsWithUserData((getAll)=>{
								res.json(getAll)
							})
						}
					})
					//res.json(questiondata.answers.length)
				}
			})
		}
	})
};

returnAllQuestions = function(req, res, getQuestions) {
	let getall = new QuestionsDb();
	getall.getAllQuestionsWithUserData((getAllQuestions) => {
		console.log(getAllQuestions, "getQuestios in db")
		getQuestions(getAllQuestions)
	})
};