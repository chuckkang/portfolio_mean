import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
	navSection: string;
	appName="Appointment System"
	constructor(private _router: ActivatedRoute ) {
		this.navSection = '';
	 }

	ngOnInit() {
		this._router.paramMap.subscribe( params => {
			//console.log("Were in the appointment obj")
			this.navSection = params.get("section");
			//console.log(this.navSection, "aapointmnent")
		})
		
	}
	

}
