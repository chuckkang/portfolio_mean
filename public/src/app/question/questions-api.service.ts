import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Userdata } from './userdata';
import { Question } from './question';

@Injectable()
export class QuestionsApiService {

	// set up all values for the service
	user: Userdata = new Userdata();
	allquestions = new Array();
	allComments = new Array();
	questions=[];

	constructor(private _http: Http) {
		//this.questions = this.getall()
		// if the refresh button is pressed, the service will reset.
		// if the service is reset, then we need to make the call to the backend to repopulate the data, but only if the session exists.{}
		//this.user = new Userdata();
		//console.log(this.verifySession(this.user.id), "this is during constructor")
		this.user = new Userdata();
		this.allquestions = new Array();
	}


	login(loginInfo, loginSuccess) {
		this._http.post('/qapp/login', loginInfo).subscribe(
			(result) => {
				//var json = result.json()
				// if there are no errors set up user
				if (result.json().errors){
					loginSuccess(result.json())
				} else {
					// login is sucessfull set up user
					//console.log("were in login")
					this.setUser(result.json())
					loginSuccess(true)
				}
			},
			(error) => {
				loginSuccess({ errors: "There was a system error with the login"})
			}
		)
	}

	logout(isLoggedOut){
		this._http.post("/logout", {}).subscribe(
			(deletedSession)=>{
				// set all the values in the service to null
				this.deleteServiceData();
				//console.log(deletedSession, "deletedSEssion")
				isLoggedOut(true);
			}, (error) =>{
				isLoggedOut({errors: error})
			})	
	}
	
	deleteServiceData(){
		this.user = null;
		this.allquestions = null;
		this.allComments = null;
		this.questions = null;
	}

	register(formValues, validRegistration){
		this._http.post("/qapp/register", formValues).subscribe(
			(result)=>{
				//console.log(result.json(), "result from registration")
				validRegistration(result.json())
			},
			(error)=>{
				validRegistration(false)
			}
		)
	}

	getUser(){
		//console.log("GET USER")
		return this.user
	}

	setUser(userjson){
		//console.log(userjson, "this is the user json")
		this.user = new Userdata();
		this.user.id = userjson.id
		this.user.firstname = userjson.firstname;
		this.user.lastname = userjson.lastname
		this.user.email = userjson.email
		this.user.dateofbirth = userjson.dateofbirth
		this.user.favoritequote = userjson.favoritequote
		this.user.totalposts = userjson.totalposts
		this.user.createdAt = userjson.createdAt
	}

	getUserData(userId, returnUser){
		// console.log(userId, "userid in getUserDat api")
		this._http.get("/qapp/user/${userId}").subscribe(
			(userdata)=>{
				//console.log(userdata, "userdata in getUserData")
				returnUser(userdata.json())
			},
			(errors)=>{
				returnUser({errors: errors})
			}
		)
	}

	updateProfile(userdata, isUpdated){
		this._http.put(`/qapp/user/update`, userdata).subscribe(
			(results)=>{
				//console.log(results.json())
				if (results.json().errors) {
					isUpdated(results.json())
				} else {
					isUpdated(true)
				}
			},
			(errors)=>{
				isUpdated(errors.json())
			}
		)
	}	
	
	verifySession(userId, loadData){
			this._http.get('/qapp/verifysession').subscribe(
				(result)=>{
					//console.log(result, "--result in verify session")
					var jsondata =  result.json()
					if (jsondata.errors) {
						//handle the error
						//console.log("THere was an error with verify in api")
						loadData({errors : jsondata.errors})
					} else {
						//console.log(jsondata, "auser data this iss the verify session api")

						this.setServiceData(jsondata);
						loadData(true)
					}
				},
				(error)=>{
					console.log(error, "--error in verify session")
					loadData({ errors: error })
				}
			)
	}
	retrieveQuestions(){
		this._http.get("/qapp/index").subscribe(
			(questions)=>{
				this.setAllQuestions(questions.json())
				return true
			},
			(error)=>{
				console.log(error, "there was an error with retreiving all question in api")
				return false
			}
		)
	}

	addQuestion(formData, addResult){
		//console.log(formData, "form data")
		this._http.post("/qapp/add", formData).subscribe(
			(result)=>{
				// console.log(result, "WHERE ARE WE")
				this.setAllQuestions(result.json())
				addResult(true)
			},
			(error)=>{
				addResult(false)
			}
		)
	}

	addAnswer(formData, returnResult){
		//console.log(formData, "form data")
		var url = "/qapp/answer/addsingle/" + formData._questionId

		this._http.post(url, formData).subscribe(
			(result)=>{
				//console.log(result, "result")
				this.setAllQuestions(result.json())
				returnResult(result.json())
			}, (error)=>{
				returnResult(error)
			}
		)
	}

	submitNewAnswer(formData, returnResult) {
		this._http.post(`/qapp/answer/add/${formData._questionId}`, formData).subscribe(
			(questionData) => {
				if (questionData.json().errors){
					console.log(questionData.json(), "errors")
					returnResult(false)
				} else {
					this.setAllQuestions(questionData.json())
					returnResult(true)
				}
			},
			(error) => {
				console.log('error inserting new answer using submitAnswer')
				returnResult = false
			}
		)
	}

	deleteQuestion(questionid, isDeleted){
		//console.log(questionid, "quetsionid")
		this._http.delete(`/qapp/question/delete/${questionid}`).subscribe(
			(refreshData)=>{
				//refreshData should be a new set of questions
				// console.log(refreshData.json())
				// update the questions list
				this.setAllQuestions(refreshData.json())
				isDeleted(true)
			},
			(error)=>{
				console.log("there was an error in the service during question deletion")
				isDeleted(false)
			}
		)
	}
	deleteAnswer(formData, deleted){
		this._http.delete(`/qapp/question/${formData.questionId}/answer/delete/${formData.answerId}/${formData.userId}`).subscribe(
			(refreshData)=>{
				if (refreshData.json().errors){
					console.log(refreshData.json().errors, "there was an error deleting in the service.")
					deleted(false)
				} else {
					this.setAllQuestions(refreshData.json())
					deleted(true)}
			},
			( error )=> {
				console.log(error, "there was an error deleting in the service.")
				deleted(false)
			}
		)}

	getSingleQuestion(questionid){
		// function will return a single question obj from the data that's been pulled.
		// this should only be called after all the data has been loaded.
		let singleQuestion;
		for (let idx=0; idx < this.allquestions.length; idx++){
			
			if (this.allquestions[idx]._id==questionid){
				singleQuestion = new Question(
					this.allquestions[idx]._id,
					this.allquestions[idx].question,
					this.allquestions[idx].userId,
					this.allquestions[idx].answers,
					this.allquestions[idx].createdAt,
					this.allquestions[idx].updatedAt
				)
				break;
			} 
		}
		return singleQuestion;
	}

	getCommentsByQuestionId(questionId: string, listOfComments){
		this._http.get("/qapp/answer/"+questionId).subscribe(
			(result)=>{
				//console.log(result.json())
				listOfComments(result.json())
			},
			(error)=>{
				console.log(error, "error geting comments")
				listOfComments({errors: error})
			}
		)
	}

	setServiceData(datajson){
		this.setUser(datajson.userdata)
		this.setAllQuestions(datajson.allquestions)
	}

	setAllQuestions(datajson){
		//console.log(datajson, "set all questions")
		this.allquestions = new Array();
		for (let qst=0; qst < datajson.length; qst++){
			this.allquestions[qst] = datajson[qst]
		}
	}

	getAllQuestions(){
		return this.allquestions
	}

	test(testresult){
		this._http.get("/qapp/test").subscribe(
			(result)=>{
				//console.log(result.json())
				testresult(result.json())
			},
			(err)=>{
				console.log(err, "there was an err")
				testresult(err)
			}
		)
	}
}