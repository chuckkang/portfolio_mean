import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css']
})
export class ActionbarComponent implements OnInit {
	navSection: string = '';
	constructor(private router: ActivatedRoute) {
		this.navSection = '';
	}

	ngOnInit() {
		this.router.paramMap.subscribe(params => {
			this.navSection = params.get("section");
		})
	}

}
