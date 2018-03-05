var mongoose = require('mongoose');
// var questionsDb = require('../config/questionsdb.js');

// you need the schema variable to make associations:
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
	question: { type: String, required: [true, "Please enter a question"] },
	// the ref: in the association actually points to the model name
	answers: [{type: Schema.Types.ObjectId, ref: 'Answers'}],
	userId: { type: Schema.Types.ObjectId, ref: 'Questions_Users'}
}, { timestamps: true });




QuestionSchema.methods.getAllQuestionsWithUserData = function(getQuestions){
	// this will be just a gteneral method to return all questions with their user id.
	Questions.find({}).sort({createdAt: -1 }).populate('userId', ['firstname', 'lastname']).populate({ path: 'answers', populate: { path: 'userId', select: ['firstname', 'lastname'] } }).exec(
		(err, result) => {
			if (err) throw err;
			//console.log(result)
			getQuestions(result);
		}
	)
}

QuestionSchema.methods.getQuestionAndAnswersById= function (questionId, getQuestions) {
	// this will be just a gteneral method to return all questions with their user id.
	// 
	Questions.find({_id: questionId}).populate('userId', ['firstname', 'lastname']).populate({path: 'answers', populate: {path: 'userId', select:['firstname', 'lastname']}}).exec(
		(err, result) => {
			if (err) throw err;
			//console.log(result)
			getQuestions(result);
		}
	)
}
var Questions = mongoose.model('Questions', QuestionSchema);