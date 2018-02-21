import { Component, OnInit } from '@angular/core';
import { QuestionsApiService } from '../questions-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question'
import { Userdata } from '../userdata';
import { validateConfig } from '@angular/router/src/config';
import { Answer } from '../answer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	allquestions=[]; // this shoudl be a list of all questions.
	newquestion: Question;
	currentUser: Userdata;
	errMessage: String;
	errAnswer: String;
	confirmationmessage: String;

	constructor(private _api: QuestionsApiService, private _router: Router, private _activatedRoute: ActivatedRoute) {
	  this.newquestion = new Question("", "", {}, [], null, null)
		this.currentUser = new Userdata();
	}

  ngOnInit() {
	  // set initial values
	  this.confirmationmessage = this.displayMessage(this._activatedRoute.snapshot.queryParamMap);
	this._api.verifySession(this.currentUser.id, (loadData)=>{
		if (loadData===true) {
			this.currentUser = this._api.getUser();
			this.allquestions = this._api.getAllQuestions();
			//add an answer variable to the array so that it can be sent back
			// to the back end based specifically on each question record
			// also add an errMessage so that it directly relates to each question.
			for (let i = 0; i < this.allquestions.length; i++){
				this.allquestions[i].newanswer=''
				this.allquestions[i].errMessage=''
			}
		} else if (loadData.errors=="invalid") {
			// console.log(2)
			// the session is not valid.
			this._api.logout((isLoggedOut)=>{
				//console.log("Logged Out");
				this._router.navigate(["/questions"])
			})
		} else {
			// session is good but /there were errors along the way.
			console.log(loadData.errors, ":  There was an errors along the way.")
			this.errMessage = loadData.errors.message
		}
	})

}

	displayMessage(querystring){
		// this function will determine if a form was completed successfully.
		// ie- if the profile form was submitted, then show the correct message at the top of the screen.
		let strMessage;
		if (querystring.get('profile')=='true'){
			strMessage = "Your profile has been updated."
		}
		return strMessage;
	}

	onSubmit(){
	this.newquestion.userId = this.currentUser.id.trim()
	this.newquestion.question = this.newquestion.question.trim()
	this._api.addQuestion(this.newquestion, (addResult)=>{
		if (addResult) {
			this.resetForm();
			this.confirmationmessage = "Your question has been successfully added."
			this.allquestions = this._api.getAllQuestions();
		} else {
			this.errMessage = "There was an error adding your question."
		}
	})
	}

  submitAnswer(questionId){
	 // console.log(questionId, "question id from form")
	  this.errAnswer = '';
	  
	  for (let x = 0; x < this.allquestions.length; x++){
		  if (questionId==this.allquestions[x]._id){
			  //console.log(this.allquestions[x], "this is the new answer")
			  // send over an answer model
			  if (!this.allquestions[x].newanswer){
				  this.allquestions[x].errMessage = "Please input an answer."  
				break;
			  }
			  var newAnswer = new Answer();
			  newAnswer._questionId = this.allquestions[x]._id
			  newAnswer.answer = this.allquestions[x].newanswer
			  newAnswer.userId = this.currentUser.id
			  newAnswer.username =  this.currentUser.getFullName();

			  this._api.addAnswer(newAnswer, (result)=>{
				if (result.errors){
					console.log(result, "There was an error processing your request")
					this.errAnswer = "There was an error processing your request. \n" + result.errors.message
				} else {
					// console.log(result, "REQUEST was successfull")
					this.resetForm()
					this.allquestions[x].errMessage = "Your answer has been submitted."
					
				}
		  	  })
	  }
	}
  }

  deleteQuestion(questionid){
	  //console.log(questionid, "where are we")
	  this._api.deleteQuestion(questionid, (isDeleted)=>{
		  if (isDeleted) {
			  //console.log("question is deleted.  ")
			  this.errMessage = "Your question has been deleted."
			  this.allquestions = this._api.getAllQuestions();
		  }
	  })
  }

	resetForm() {
		this.confirmationmessage='';
		this.newquestion.question='';
		for (let i = 0; i < this.allquestions.length; i++) {
			this.allquestions[i].newanswer="";
			this.allquestions[i].errMessage = "";
		}
	}
}

