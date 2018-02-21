export class Question {
	id: string;
	question: string;
	userId : {};
	answers = [];
	createdAt: Date;
	updatedAt: Date;

	constructor(_id: string, _question: string,  _userId: {}, _answers: any, _createdAt: Date, _updatedAt: Date){
		this.id = _id;
		this.question = _question;
		this.userId = _userId;
		this.answers = _answers;
		this.createdAt = _createdAt;
		this.updatedAt = _updatedAt;
	}

	returnQuestion(){
		return `id: ${this.id}`
	}
}
