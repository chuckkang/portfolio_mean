import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidenote',
  templateUrl: './sidenote.component.html',
  styleUrls: ['./sidenote.component.css']
})

export class SidenoteComponent implements OnInit {
	navSection: string = '';
  constructor(private router: ActivatedRoute) {
	  this.navSection = '';
   }

  ngOnInit() {
	  this.router.paramMap.subscribe( params => {
		  this.navSection = params.get("section");
	  })
  }

}
