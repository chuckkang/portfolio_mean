import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { User } from "./user"

import 'rxjs/Rx';

@Injectable()
export class ApiService {
	data=[];
	allAppointments=[];
	allAnswers = [];
	val=[];
	username='';
	currentUser: User;
	// navigation page

	constructor(private _http: Http) {
		// loading initial in constructor.
		this.getAll((results)=>{});
		this.currentUser =  new User("", "", "")
	 }
	 // THESE IS A CREATEITEM METHOD IN OUR SERVICE
	add(appointment, result, error) {
		// the add case will take care of both an edit
		// and a new added appointment based on whether
		// the appointment id exists
		if (appointment.id != ''){
			// if there is an id then it is an edit
			this._http.put('/edit', appointment).subscribe(
				(response) => {	result(response.json()); },
				(error) => {error(error.json());}
			);
		} else {
			this._http.post('/add/new', appointment).subscribe(
				(response) =>  { result(response.json()); },
				(error) => { error(error.json()); }
			);	}}

	getSingleAppointment(appointmentId, appointmentData){
		//check if we can get data from service or do we need to retrieve new data\
		this._http.get("/show/"+appointmentId).subscribe(
			(result)=>{appointmentData(result.json())},
			(error)=>{ appointmentData({ error: "there was an error retrieving the data from the database"}) }
		)}

  getAll(callback){
	  this._http.get("/all").subscribe(
		(response) => {
			this.allAppointments = response.json();
			callback(this.allAppointments);
		},
		(error) => { callback(error); }
	)}

  getAllAppointments(){
	  return this.allAppointments;
  }

  deleteAppointment(formData, results, err){
	  this._http.delete("/delete/"+formData.id).subscribe(
		  (results)=>{
			  //console.log(results, "success delete in service")
			  if (results.json().invalid){
				console.log("session is invalid")
			  }
		  },
		(err)=>{ console.log(err, "--There was an error with the deletion")}
	  )
	}

  login(user, success){
		// function will send over the username to the backend.
		// backend will create a new user if there are no duplicates, otherwise set session.
		/// this._http.post(urladdress, data).subscribe((results)=>{}, (error)=>{})
	var isValid = false;
	this._http.post("/login", user).subscribe(
		(result)=> { 
			var userjson = result.json(); // need to re-jsonify this because it has header information.
			//console.log(result, "this is the result from the login")
			this.setUser(userjson)
			success(true)},
		(error)=>{ console.log(error, "- There was an error logging in")}
	)
  }

  logout(){
	  this._http.post("/logout", this.currentUser).subscribe(
		  (result) => { 
			//   console.log(result.json(), "-user is logged out")
			  this.currentUser.id = ""
			  this.currentUser.username = ""
			  this.currentUser.email = ""
		  },
		  (error) => {  
			  console.log(error, "error exists during logout process") 
			}
	  )
  }

  getUser(){
	  return this.currentUser;
  }

  getTestUser(){
	  this.currentUser.username = "test user"
	  this.currentUser.email = ""
	  this.currentUser.id = "test user id"
	  return this.currentUser
  }

  setUser(userdata) {
	  //console.log(userdata, "userdata")
	  this.currentUser = new User("","","")
	  this.currentUser.id = userdata.id
	  this.currentUser.username = userdata.username
	  if (!userdata.email){ this.currentUser.email = "" } 
	  else { this.currentUser.email = userdata.email }
  }

  verifyLogin(userData, sessionExists){
	  let isLoggedIn = false
	  if (userData.id) {
		  sessionExists(true)
	  } else {
		  this._http.post("/verifyLogin", userData).subscribe(
			  (result) => {
				  if (result) {
					  this.setUser(result.json())
					  if (this.currentUser.id) {
						  sessionExists(true)
						  return isLoggedIn = true;
					  } else {
						  sessionExists(false)
						  return isLoggedIn = false;
					  }
				  } },
			  (error) => {
				  console.log("error in trying to verify session")
				  return isLoggedIn
			  })
	  }  
  }
}
