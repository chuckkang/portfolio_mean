import { Component, OnInit } from '@angular/core';
import { QuestionsApiService } from '../questions-api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

constructor(private _api: QuestionsApiService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
	  this._api.test((testresult)=>{
		
	  })
  }

}
