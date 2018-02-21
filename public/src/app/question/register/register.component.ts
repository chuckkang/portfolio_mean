import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsApiService } from '../questions-api.service';
import { Registrationdata } from '../registrationdata';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registration: Registrationdata;
	errMessage :String;

  constructor(private _api: QuestionsApiService, private _router: Router) {
	  this.registration = new Registrationdata('', '', '', '', '')
	this.errMessage = '';
  }

  ngOnInit() {

  }

  onSubmit(){
	// check the validation of the form


// do front end validations before you check with the back end
	if (this.validateForm()){
		this.registration.firstname = this.registration.capitalizeName(this.registration.firstname.trim())
		this.registration.lastname = this.registration.capitalizeName(this.registration.lastname.trim())
		this.registration.email = this.registration.email.toLowerCase().trim();
		this.registration.password = this.registration.password.trim();
		this.registration.confirm = this.registration.confirm.trim();
		
		this._api.register(this.registration, (validRegistration) => {
			console.log(validRegistration, "ASDFASDF")
			if (!validRegistration) {
				// if validregistration is FALSE, then soemthing happened in the api
				this.errMessage = "There was a fatal error.  Please contact your system administrator."
			} else {
				if (validRegistration.errors) {
					// there was an error with the backend
					//if the json has an error message there was a problem with teh backend
					//console.log(validRegistration, "registration")
					if (validRegistration.errors == "invalid") {
						this.errMessage = "A user with this email address already exists.  Please provide a different email address."
					} else if (!validRegistration.errors.message) {
						//navigate to new page
						console.log(validRegistration, "validRegistration")
						this.errMessage = validRegistration.errors
					} else {
						this.errMessage = validRegistration.errors.message
					}
				} else {
					this._router.navigate(['questions', 'login'], {queryParams: {success: true}});
				}
			}
		})
	}
  }

  validateForm(){
	  let blnValid = false;
	  if (!this.registration.firstname){
		  this.errMessage = this.displayFormMessage('first')
	  } else if (!this.registration.lastname) {
		  this.errMessage = this.displayFormMessage('last')
	  } else if (!this.registration.email) {
		  this.errMessage = this.displayFormMessage('email')
	  } else if (!this.registration.password) {
		  this.errMessage = this.displayFormMessage('password')
	  } else if (!this.registration.confirm) {
		  console.log(!this.registration.confirm)
		  this.errMessage = this.displayFormMessage('confirm')
	  } else if (this.registration.confirm != this.registration.password) {
			 this.errMessage = this.displayFormMessage('match')
			  this.registration.confirm = '';
			  this.registration.password = '';
	  }	else {
		blnValid = true;
	  }
	  return blnValid
  }

  displayFormMessage(inputname)
  {
	  console.log(inputname)
	  let str = "Please enter";
	switch (inputname){
		case 'first':
			str = str + ' a first name.';
			break;
		case 'last':
			str = str + ' a last name.';
			break;
		case 'email':
			str = str + ' a valid email address.'
			break;
		case 'password':
			str = str + ' a password.'
			break;
		case 'confirm':
			str = "Please confirm your password."
			break;
		case 'match':
			str = "Your password and confirm password must match.   Please re-enter both passwords so they match."
			break;
		default:
			str = "There was an error processing your request.  Please contact the system administrator."
			break;
	}
	return str	
  }
}
