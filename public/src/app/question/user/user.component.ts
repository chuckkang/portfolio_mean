import { Component, OnInit } from '@angular/core';
import { Userdata } from '../userdata'
import { QuestionsApiService } from '../questions-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	currentUser: Userdata;
	userprofile: Userdata;

	strMessage: String = "";
	constructor(private _api: QuestionsApiService, private _router: Router, private _activatedRoute: ActivatedRoute) {
		this.currentUser = this._api.getUser();
		this.userprofile = new Userdata();
	}

	ngOnInit() {
		this._api.verifySession(this.currentUser.id, (loadData) => {
			if (loadData) {
				this.currentUser = this._api.getUser();
				// if the parameter exists then show the user with the user id
				// other wise just show the current user.
				// current user can edit their data but not other peoples data.
				this._activatedRoute.paramMap.subscribe(userid => {
					let userId = userid.get("questionId");
					// TODO:
					// change routing file to use a userid not quetsion id:
					// _____________________________________________________

					//console.log(userId, "userId")
					if (userId === this.currentUser.id || userId==null){
						// if the userid is the same as the currentuser then just get data from the service.
						this.setProfile(this.currentUser)
						//console.log(this.userprofile, "userprofile")
					} else {
						this._api.getUserData(userId, (userData) => {
							if (!userData.errors) {
								if (this.currentUser.id === userId || !userId) {
									// show form wiht user information
									//console.log("profile-", this.currentUser)
									this.setProfile(this.currentUser)
								} else {
									this._api.getUserData(userId, (userData) => {
										if (!userData.errors) {
											if (this.currentUser.id === userId || !userId) {
												// show form wiht user information
												//console.log("profile-", this.currentUser)
												this.setProfile(this.currentUser)
											} else {
												// get data for the other user
												//console.log("userData-", userData)
											}
										} else {
											this.strMessage = this.displayMessage("", userData);
										}
									})
								}
							} else {
								this.strMessage = this.displayMessage("", userData);
							}
						})
					}
					

				})
				console.log(this.currentUser, "current User")
			} else {
				// reroute to logout page.
			}
		}) 

	}

	setProfile(userData) {
		this.userprofile.id = userData.id;
		this.userprofile.firstname = userData.firstname;
		this.userprofile.lastname = userData.lastname;
		this.userprofile.email = userData.email;
		// console.log(userData.email, "USER DATA IN SET PROFRILEs")
		this.userprofile.favoritequote = userData.favoritequote;
		this.userprofile.totalposts = userData.totalposts;
		this.userprofile.createdAt = userData.createdAt;
	}

	displayMessage(messageNo, json) {
		let message = "";
		switch (messageNo) {
			case 1: ""
				break;
			default:
				message = "There was a error processing your request. " + json.errors.message
				break;
		}
		return message;
	}
}

