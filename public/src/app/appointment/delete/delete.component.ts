import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-delete',
	templateUrl: './delete.component.html',
	styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
	success: boolean;
	id: string;
	errMessage: string;
	constructor(private _api: ApiService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

	ngOnInit() {
		//   if (this._api.username==''){
		// 	  this._router.navigate(['/']);
		//   }else{
		// 	  this._activatedRoute.paramMap.subscribe(params=>{
		// 		  this.id = params.get("id");
		// 			console.log("id", this.id);
		// 	  })
		// 	// this._api.deleteQuestion
		//   }
		this._activatedRoute.paramMap.subscribe(params => {
			this.id = params.get("id");
			//console.log("id____________", this.id);
			this._api.deleteAppointment({ id: this.id },
				(err) => {
					this.errMessage = err;
					// console.log("ASDFASDDSF")
				}, (results) => {
					this._router.navigate(['/appointment/dashboard']);
				}

			)
			this._router.navigateByUrl('/appointment/dashboard');
		})
	}

}
