

class User {
	
	constructor() {
		this._id = '';
		this.username = "";
		this.email = ""
	}
	set name(name) {
		this.username = name.charAt(0).toUpperCase() + name.slice(1);
	}
	get name() {
		return this.username;
	}
	sayHello() {
		console.log('Hello, my name is ' + this.username + ', I have ID: ' + this._id);
	}
}

exports.UserData = User;