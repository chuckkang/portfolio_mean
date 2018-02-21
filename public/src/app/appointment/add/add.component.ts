import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../appointment';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	allAppointments = [];
	username: string;
	id: string;
	title: string = "Add A New ";
	errMessage: string;
	appointment = new Appointment("", "", "", null, "", "");
	urlAptId: string;

	constructor(private _api: ApiService, private _router: Router, private activatedroute: ActivatedRoute) {
	}

	ngOnInit() {
		//var user = this._api.g
		// getTestUser() //for testing purposes
		//console.log(user)
		var user = 	this._api.getUser()
		this._api.verifyLogin(user, (sessionExists)=> {
			if (sessionExists){
				console.log(sessionExists, user, "--ACTIVE STATUS")
				this.activatedroute.paramMap.subscribe( params => {
					this.urlAptId = params.get("id")
					//console.log(this.urlAptId, "asdf")
					if (this.urlAptId){
						// if urlAptId exists, then it is an edit
						this.title = "Edit "
						this._api.getSingleAppointment(this.urlAptId, (appointmentData)=>{
							console.log(appointmentData, "--apptmentdata in add component")
							this.appointment = appointmentData
							console.log(this.appointment, "--Single Appointment")
						})
					} else {
						// if there is no urlAptId then it is a new one
						this.appointment.name = this._api.getUser().username
					}
				})
			} else {
				// redirect to logout
				//console.log(sessionExists, "--Session INCACTIVE STatus")
				//this._router.navigate(['/appointment/logout'])
				user = this._api.getTestUser()
			}
		})
	}

	onSubmit() {
		if (this.appointment.apptdate) {
			this.appointment.fulldate = new Date(this.appointment.apptdate + " " + this.appointment.appttime)
			if (this.checkValidDate(this.appointment.fulldate)) {
				if (this.checkMaxAppointments()) {
					this._api.add(this.appointment,
						(result) => {
							this._router.navigate(['/appointment/dashboard']); 
						}, 
						(error) => {
							console.log(error, "There was an error processing your request.")
						})
				}
				else {
					this.errMessage = "There are too many appointments for this date. Please choose another date."
				}

			} else {
				this.errMessage = "The appointment date must be after today's date."
			}
		} else {
			this.errMessage = "Please enter an appointment date."
		}
	}

	checkValidDate(date: Date) {
		var aptDate = date;
		var currentDate = new Date();
		if (aptDate < currentDate) {
			return false;
		} else {
			return true;
		}
	}

	

	checkMaxAppointments() {
		var count = 0;
		for (let x = 0; x < this.allAppointments.length; x++) {
			if (this.appointment.apptdate == this.allAppointments[x]['apptdate']) {
				count++;
			}
		}
		if (count > 2) {
			return false;
		} else {
			return true;
		}

	}

	checkDate(){
		var selectedDate = new Date(this.appointment.apptdate + " 00:00");
		var currentDate = new Date();
		if (selectedDate < currentDate) {
			this.errMessage = "The appointment date must be after today's date."
		} else {
			this.errMessage = "";
		}
	}
}
