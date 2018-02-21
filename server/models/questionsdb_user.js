
class FullUser {
	constructor() {
		this.id = "";
		this.firstname = "";
		this.lastname = "";
		this.email = "";
		this.favoritequote = "";
		this.numberofposts = 0;
		this.createdAt = null;
		this.updatedAt = null;
	}
	set firstname(name) {
		this.firstname = name.charAt(0).toUpperCase() + name.slice(1);
	}
	get firstname() {
		return this.firstname;
	}
	set lastname(last) {
		this.lastname = name.charAt(0).toUpperCase() + name.slice(1);
	}
	get lastname() {
		return this.lastname;
	}

}

// exports.FullUser = FullUser;