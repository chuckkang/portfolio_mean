import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { QuestionsApiService } from '../questions-api.service'

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
	email: String;
	password: String;
	errMessage: String = '';
 
	constructor(private _router: Router, private _api: QuestionsApiService, private _activatedRoute: ActivatedRoute){
		// this.email = 'chuck@chuck.com';
		// this.password = 'guest';
	 }

  ngOnInit() {
	  this._activatedRoute.queryParamMap.subscribe(params=>{
		  if (params.get("success")=="true"){
			this.errMessage="Registration was successfull.  Please enter your credentials to login."
		  }
	  })
  }
  onSubmit(){
	  this.errMessage = '';
	  this.email = this.email.toLowerCase().trim();
	  this.password = this.password.trim();
	if (this.email) {
		if (this.password) {
		//call the service
		let loginData = { email: this.email, password: this.password }
		//console.log(loginData, "LoginData")
		let blnValid = this._api.login(loginData, (loginSuccess) => {
			//console.log(loginSuccess, "login result")
			if (loginSuccess===true) {
				//console.log(loginSuccess, "--userlogin -- Login sucess")
				this._router.navigate(['/questions', 'main']);
			} else if (loginSuccess.errors) {
				//console.log(loginSuccess, "THis is the return")
				if (loginSuccess.errors.message == "invalid") {
					// if loginSuccess.errors does not have a message,
					// then the email and password was not found.
					this.errMessage = "Email and password combination was not found.  Please try again or register for a new account."
				} else {
					//console.log(loginSuccess.errors, "This is the error")
					this.errMessage = loginSuccess.errors.message
				}
			}
		})
		} else {
			this.errMessage = "Please enter a Password."
		}
	} else {
		this.errMessage = "Please enter your email address."
	}
  }

  register(){
	  this._router.navigate(['/questions', 'register'])
  }
}
