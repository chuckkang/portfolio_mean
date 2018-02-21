import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../user';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username = '';
	objUser: User;

	constructor(private _api: ApiService, private _route: Router) { }

	ngOnInit() {

	}

	onSubmit() {
		this.objUser = new User("", this.username, "");

		this._api.login(this.objUser, (success) => {
			this._route.navigate(['/appointment/dashboard']);
		});
		
	}
	
}