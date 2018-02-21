import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user';

import "rxjs";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	allData = [];
	single = [];
	sub = [];
	somevalue;
	currentUser: User
	hiddenval: string;
	noAppointments: boolean;
	constructor(private _route: Router, private _api: ApiService) {
		
	}

	ngOnInit() {
		this.currentUser = this._api.getUser()
		this._api.verifyLogin(this.currentUser, (sessionData)=>{
			if (sessionData==false) {
				this._route.navigate(['/appointment/logout'])
			} else {
				this._api.getAll((data) => {
					this.currentUser = this._api.getUser()
					this.allData = data;
					if (this.allData.length==0){
						this.noAppointments=true;
					}
				});	
			}
		})

	}

	navigate(aptVal){
		// this is trigger when they click yes to deleting the appointment.asdf
		this._route.navigate(['/appointment/delete/'+aptVal])
	}
}