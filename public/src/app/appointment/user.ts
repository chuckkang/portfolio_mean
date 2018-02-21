export class User {
	id: string;
	username: string;
	email: string;
	constructor(_userId: string, _username:string, _email: string){
		this.id = _userId;
		this.username = _username;
		this.email = _email;
	}

}
