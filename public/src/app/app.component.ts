import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
	navSection='';
	constructor(private _route: ActivatedRoute){

  }

	  ngOnInit(){
		  if (!window.location.pathname || window.location.pathname==='/'){
			this.navSection = 'index'
		  } else {
			this.navSection = 'application'
		  }	
	  }

}
