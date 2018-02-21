

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new mongoose.Schema({
	name: { type: String },
	complaint: { type: String },
	apptdate: { type: String },
	appttime: { type: String },
	fulldate: { type: Date }
	// the ref is the actual name of the related key modelschema....mongoose.model('Answer', AnswerSchema);
}, { timestamps: true });

var	UserSchema = new mongoose.Schema({
	username: { type: String },
	email: { type: String },
	sessionTime: { type: Date },
	// the ref is the actual name of the related key modelschema....mongoose.model('Answer', AnswerSchema);
}, { timestamps: true });

var Appointment = mongoose.model('Appointment', AppointmentSchema);
var User = mongoose.model('User', UserSchema);