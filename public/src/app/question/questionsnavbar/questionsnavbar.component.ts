import { Component, OnInit, Input } from '@angular/core';
import { QuestionsApiService } from '../questions-api.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-questionsnavbar',
  templateUrl: './questionsnavbar.component.html',
  styleUrls: ['./questionsnavbar.component.css']
})
export class QuestionsnavbarComponent implements OnInit {
	@Input() navsection;

  constructor(private _api: QuestionsApiService, private _router: Router) { }

  ngOnInit() {
	  //console.log("is this working")
  }

  logout(){
	  this._api.logout((isLoggedOut)=>{
		  if (isLoggedOut) {
			this._router.navigateByUrl('/questions')
		}
	  })
  }
}
