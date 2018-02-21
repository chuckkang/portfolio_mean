import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ApiService } from './appointment/api.service';
import { LoginComponent } from './appointment/login/login.component';
import { DashboardComponent } from './appointment/dashboard/dashboard.component';
import { LogoutComponent } from './appointment/logout/logout.component';
import { DeleteComponent } from './appointment/delete/delete.component';
import { AddComponent } from './appointment/add/add.component';
import { MeanComponent } from './mean/mean.component';
import { NavbarComponent } from './appointment/navbar/navbar.component';
import { SidenoteComponent } from './appointment/sidenote/sidenote.component';
import { ActionbarComponent } from './appointment/actionbar/actionbar.component';
import { AppnotesComponent } from './appointment/appnotes/appnotes.component';

import { QuestionComponent } from './question/question.component';
import { QuestionsApiService } from './question/questions-api.service';
import { RegisterComponent } from './question/register/register.component';
import { UserloginComponent } from './question/userlogin/userlogin.component';
import { MainComponent } from './question/main/main.component';
import { ViewComponent } from './question/view/view.component';
import { QuestionsnavbarComponent } from './question/questionsnavbar/questionsnavbar.component';
import { ProfileComponent } from './question/profile/profile.component';
import { UserComponent } from './question/user/user.component';
import { TestComponent } from './question/test/test.component'


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
	AppointmentComponent,
	LoginComponent,
	DashboardComponent,
	LogoutComponent,
	DeleteComponent,
	AddComponent,
	MeanComponent,
	NavbarComponent,
	SidenoteComponent,
	ActionbarComponent,
	AppnotesComponent,
	QuestionComponent,
	RegisterComponent,
	UserloginComponent,
	MainComponent,
	ViewComponent,
	QuestionsnavbarComponent,
	ProfileComponent,
	UserComponent,
	TestComponent,

  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpModule,
	FormsModule,

  ],
  providers: [ApiService, QuestionsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
