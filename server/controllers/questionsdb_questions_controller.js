
var mongoose = require("mongoose");
var QuestionsDb = mongoose.model('Questions');
var AnswersDb = mongoose.model('Answers');
var UsersDb = mongoose.model('Questions_Users');
var answersController = require('./questionsdb_answers_controller.js');

module.exports = {
	index: (req, res) =>{
		QuestionsDb.find({}, (err, allquestions)=>{
			if (err) { 
				//console.log(err, "there was an error getting all questions")
				res.json({ errors: err})
			}
			else {
				//console.log(allquestions, "this is all the questions")
				res.json(allquestions)
			}
		})
	},

	add: (req, res) => {
		//console.log(req.body, "--req.body")
		
		var newQuestion = new QuestionsDb()
		newQuestion.question = req.body.question
		newQuestion.userId = req.body.userId;
		
		newQuestion.save((error)=>{
			let datajson;
			// console.log(newQuestion, "newquestion")
			if (error){
				console.log(error, "Error adding new question")
				datajson = {errors: error}
				res.json(datajson)
			} else {
				//.console.log(newQuestion, ":;newwueawtions")
				datajson = newQuestion
				let getAll = new QuestionsDb();
				getAll.getAllQuestionsWithUserData((results)=>{
					//console.log(results, "________________all questions")
					res.json(results)
				})
			}
			
		})
	},

	delete: (req, res)=>{
		//req.session.userId = "5a68f4aed124c414542f0e3c"
		let jsonresults;
		if (req.session.userId){
			//console.log(req.params.questionid, "req.params.questionid")
			QuestionsDb.findOne({_id: req.params.questionid}, (err, question)=>{
				if (err) throw err;
				//console.log(question, "answers array")
				
				AnswersDb.remove({ _id: {$in: question.answers}}, (err)=>{
					if (err){
						//console.log(err, "this is the error")
						res.json({errors: {messages: "invalid delete"}})
					}
					else {
						QuestionsDb.remove({ _id: req.params.questionid}, (err)=>{
							if (err) throw err;
							let returnQuestions = new QuestionsDb();
							returnQuestions.getAllQuestionsWithUserData((getQuestions)=>{
								res.json(getQuestions)
							})
						})
					}
				})
			})
			
		} else {
			res.json("user is invalid")
		}
	},

	test: (req, res)=>{
		
		QuestionsDb.find({}).populate("userId").exec(
			(err, result)=>{
				if (err) throw err;
				res.json(result)
			}
		)
		
	}
}