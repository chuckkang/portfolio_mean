export class Userdata {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	favoritequote: string;
	dateofbirth: string;
	totalposts: number;
	createdAt: Date;

	constructor(){
		this.id='';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.favoritequote = '';
		this.dateofbirth=null;
		this.totalposts=0;
		this.createdAt = null;
	}

	
	getFullName(){
		return `${this.firstname} ${this.lastname}`
	}

	set first(first){
		this.firstname = this.formatName(first);
	}

	get first(){
		this.firstname = this.formatName(this.firstname)
		return this.firstname
	}
	set last(last) {
		this.lastname = this.formatName(last);
	}

	get last() {
		this.lastname = this.formatName(this.lastname)
		return this.lastname
	}

	formatName(name){
		name = name.charAt(0).toUpperCase() + name.slice(1);
		return name
	}
}
