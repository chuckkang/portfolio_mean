import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { QuestionsApiService } from './questions-api.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
	navSection: String;

	constructor(private _router: Router, private _api: QuestionsApiService, private _activatedRoute: ActivatedRoute) {
		this.navSection=='';
	}

	// constructor(private _router: Router) { }

  ngOnInit() {
	  // we will this component to route the internal path for the questions application.
	  // we will determine where the url is and appropriately pick out the correct component to display.
	  this._activatedRoute.paramMap.subscribe(params => {
		  this.navSection = params.get("section");
		  //console.log(this.navSection, "--question--section")
	  })
  }
}
