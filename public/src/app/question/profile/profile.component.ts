import { Component, OnInit } from '@angular/core';
import { Userdata } from '../userdata'
import { QuestionsApiService } from '../questions-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	currentUser: Userdata;
	strMessage: String ="";
  constructor(private _api: QuestionsApiService, private _router: Router, private _activatedRoute: ActivatedRoute) {
	  this.currentUser = new Userdata();
	this.currentUser = this._api.getUser();
  }

  ngOnInit() {
	  this._api.verifySession(this.currentUser.id, (loadData) => {
		if (loadData){
			this.currentUser = this._api.getUser();
	  } else {
		  //loading of data didn't work.
		  // navigate back to login'
			this._router.navigate(['questions', 'main'])
	  }
	  })
  }

  	setProfile(userData){
		this.currentUser = new Userdata();
		this.currentUser.id = userData.id;
		this.currentUser.firstname = userData.firstname;
		this.currentUser.lastname = userData.lastname;
		this.currentUser.email = userData.email;
		this.currentUser.favoritequote = userData.favoritequote;
		this.currentUser.totalposts = userData.totalposts;
	  }
	
	onSubmit(){
		//console.log(this.currentUser, "this user")
		this._api.updateProfile(this.currentUser, (isUpdated)=>{
			if (isUpdated===true){
				//console.log('is UPdated')
				this._router.navigate(['/questions/main'], { queryParams: {profile: true}})
			} else if (isUpdated.errors){
				//console.log("is not updated")
				this.strMessage = this.displayMessage(0, isUpdated);
			}
		})
	}

	displayMessage(messageNo, json) {
		let message="";
		switch (messageNo) {
			case 1: ""
				break;
			case 2: 
				break;
			case 3:
				break;
			default:
				message = "There was a error processing your request. " + json.errors.message
				break;
		}
		return message;
	}
}

