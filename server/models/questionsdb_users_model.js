var mongoose = require("mongoose")
var bcrypt = require("bcrypt-as-promised");

// Need the Schema variable to make associations to other moodels
var Schema = mongoose.Schema;
var UsersSchema = new mongoose.Schema({
	firstname: {type: String, required: [true, "First Name is required"], minlength: 3 }, 
	lastname: { type: String, required: [true, "Last Name is required"], minlength: 2},
	email: {
		type: String, required: [true, "Email is required"], validate: {
			validator: function (email) {
				return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(email);
			}, message: "Email must be valid"
		}, unique: true
	},
	password: { type: String, required: [true, "Password is required"], minlength: 3},
	favoritequote: {type: String, required: false, default: "none"},
	dateofbirth: {type: [Date, "Date of Birth must be a valid date"], required: false, default: null },
	totalposts: { type: Number, required: true, default: 0},
	_questionId: { type: Schema.Types.ObjectId, ref: 'Questions'},
	_answerId: { type: Schema.Types.ObjectId, ref: 'Answers' }
}, { timestamps: true })

// create a bcrypt function available on the model itself.
// you can only use these functions if you created an instance of the Model.
UsersSchema.methods.hash_password = function (pass) {
	bcrypt.hash(pass, 10).then(hashed_password=>{
		return hashed;
	})
}
UsersSchema.methods.addJayToString = function (input) {
	return input + " Jay";
}
var questionDb_Users = mongoose.model('Questions_Users', UsersSchema)
