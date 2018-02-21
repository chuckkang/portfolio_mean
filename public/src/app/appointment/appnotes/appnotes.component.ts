import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appnotes',
  templateUrl: './appnotes.component.html',
  styleUrls: ['./appnotes.component.css']
})
export class AppnotesComponent implements OnInit {
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
