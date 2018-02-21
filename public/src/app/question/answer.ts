export class Answer {
	id: string;
	_questionId: string;
	answer: string;
	userId: string;
	username: string;
	createdAt: string;
	modifiedAt: string;

	constructor(){
		this.id="";
		this._questionId="";
		this.answer="";
		this.userId="";
		this.username = "";
		this.createdAt = "";
		this.modifiedAt = "";
	}

	getAnswer(){
		// returns the contents of the instance
		let str = `id: ${this.id}, _questionId: ${this._questionId}, answer: ${this.answer}, userId: ${this.userId}, username: ${this.username}, createdAt : ${this.createdAt}, modifiedAt  : ${this.modifiedAt};`
		return str
	}
}
