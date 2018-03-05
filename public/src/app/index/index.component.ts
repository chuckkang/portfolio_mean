import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
name: string;
email: string;
comments: string;

  constructor(private _http: Http) {
	  this.name = "Chuck Kang";
	  this.email = "chuckkang.developer@gmail.com"
	  this.comments = "Let's hope this all works........................"
  }

  ngOnInit() {

  }

  sendEmail(){
// 	console.log(this.name, this.email, this.comments)
// 	let formValues = {
// 		from: '"Chuck The Developer" <chuckkang.developer@gmail.com',
// 		to: 'chuckkang@gmail.com',
// 		subject: 'Testing the email function from the website',
// 		text: "We did it !!!!!"
// 	}
// 	  this._http.post("/qapp/email", formValues).subscribe(
// 		  (error)=>{
// 			  console.log(error, "error is here")
// 		  }, (result)=>{
// 			  console.log(result, "This is the result from teh email.")
// 		  }
// 	  )
//  
  }
}