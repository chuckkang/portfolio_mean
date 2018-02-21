import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { Answer } from '../answer';
import { QuestionsApiService } from '../questions-api.service';
import { RouterModule } from '@angular/router';
import { Userdata } from '../userdata';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
	question: Question;
	answers: Array<Answer>;// creating an array of answer objects
	currentUser: Userdata;
	errMessage: String = '';
	sysMessage: String = '';
	newanswer: String;
	
  constructor(private _api: QuestionsApiService, private _router: RouterModule, private _activatedRoute: ActivatedRoute) {
	  this.question = new Question("", "", {},  [], null, null);
	  this.answers = new Array<Answer>();
	  this.currentUser = this._api.getUser();
  }

  ngOnInit() {
	  
	  this._api.verifySession(this.currentUser.id, (loadData) => {
		  if (loadData === true) {
			  this.currentUser = this._api.getUser();
			//   console.log(this.currentUser, "get user")
			  this._activatedRoute.paramMap.subscribe((questionid)=>{
				  this.question.id = questionid.get("id")
				  if (this.question.id) {
					  this.question = this._api.getSingleQuestion(this.question.id)
					  if (!this.question){
						  this.question = new Question("", "", "", [], null, null);
						  this.sysMessage = this.displayFormErrors(1, null)
						  //console.log(this.errMessage, "this.errMessage")
					  }
				  } else {
					this.errMessage = this.displayFormErrors(1, null)
					  console.log("test location")
				  }
			  })
		  } else if (loadData.errors) {
			  this.errMessage = loadData.errors.message
		  }
	  })
  }

  submitAnswer(){
	  //console.log(questionId, newanswer, "form dta in service")
	  // this submit answer is being called from the html.....
	  // not sure if this is a good idea, because now we hvae to check the session.
	  if (!this.newanswer) {
		  alert("Answer input box should not be empty")
	  } else {
		  let formData = {
			  _questionId: this.question.id,
			  answer: this.newanswer.trim()
		  }
		  this._api.submitNewAnswer(formData, (isValid)=>{
			  if (isValid){
				  // refresh teh data
				  this.question = this._api.getSingleQuestion(this.question.id)
				  this.resetForm()
			  } else {
				  this.errMessage = "There was a problem submitting your request."
			  }
		  })
	  }
  }

  deleteAnswer(questionid: string, answerid: string, userid: string){
	// userid for the answer is necessary so that you can check the session variable against the userid of the answer.  
	
	let formData = {
		  questionId: questionid, answerId : answerid, userId: userid
	  }
	  this._api.deleteAnswer(formData, (isDeleted)=>{
		if (!isDeleted) {
			this.errMessage = this.displayFormErrors(3, null)
		} else {
			this.question = this._api.getSingleQuestion(this.question.id)
			this.errMessage = this.displayFormErrors(4, null)
		}
	  })
  }

  resetForm(){
	  this.errMessage = '';
	  this.sysMessage = '';
	  this.newanswer = '';
  }
  displayFormErrors(errNumber: number, optionaljson){
	  // going to try to use an error object to handle all error requests.
	// clear form errors:
	this.sysMessage = '';
	this.errMessage = '';

	let errorMessage = '';
	let jsonfile = optionaljson || {}
	let errCode = errNumber || 0

	switch (errNumber){
		case 1:
		// form errors or navigation errors.
			// errorMessage = 'The question id is not found.  Please <a [routerLinke]="[' + "'/questions/main']>" + "go back </a> and retry your request."
			errorMessage = "The question id is not found."
			break;
		case 2:
			errorMessage = ""
		// shoudl you handle the json objects with the default?
		case 3:
			errorMessage = "Your answer was not deleted."
			break;
		case 4:
			errorMessage = "Your answer has been deleted."
			break;
		case 5: 
			errorMessage = "Your answer has been submitted."
			break;
		default: 
	}
	return errorMessage
  }
}
