export class Registrationdata {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	confirm: string;
	constructor(_firstname: string, _lastname: string, _email: string, _password:string, _confirm: string){
		this.firstname = _firstname;
		this.lastname = _lastname;
		this.email = _email;
		this.password = _password;
		this.confirm = _confirm;
	}

	capitalizeName(name: string){
		var arrName = name.split(/[ -]+/)
		var newName='';
		for (let i = 0; i < arrName.length; i++){
			arrName[i] = arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1)
			newName = newName + " " + arrName[i]
		}
		return newName.trim();
	}
}
