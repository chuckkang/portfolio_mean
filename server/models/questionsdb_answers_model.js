var mongoose = require('mongoose');

//Need the Schema variable to make associations
var Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema({
	_questionId: { type: Schema.Types.ObjectId, ref: 'Questions' },
	userId: { type: Schema.Types.ObjectId, ref: 'Questions_Users'},
	answer: { type: String, required: [true, "Please enter an answer"] }, // what whas sent over
	likes: { type: Number, required: true, default: 0 }
}, { timestamps: true });

var Answers = mongoose.model('Answers', AnswerSchema);