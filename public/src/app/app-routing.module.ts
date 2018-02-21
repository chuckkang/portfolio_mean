import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DashboardComponent } from './appointment/dashboard/dashboard.component';
import { AddComponent } from './appointment/add/add.component';
import { DeleteComponent } from './appointment/delete/delete.component';
import { LogoutComponent } from './appointment/logout/logout.component';
import { MeanComponent } from './mean/mean.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
	{ path: '', component: IndexComponent },
	{ path: 'appointment', component: AppointmentComponent, pathMatch: "full" },
	{ path: 'appointment/:section', component: AppointmentComponent, pathMatch: "full" },
	{ path: 'appointment/:section/:id', component: AppointmentComponent, pathMatch: "full" },
	{ path: 'appointment/logout', component: LogoutComponent, pathMatch: "full" },

	{ path: 'mean', component: MeanComponent, pathMatch: "full" },

	{ path: 'questions', component: QuestionComponent, pathMatch: "full" },
	{ path: 'questions/:section', component: QuestionComponent, pathMatch: "full" },
	
	{ path: 'questions/:section/:id', component: QuestionComponent, pathMatch: "full" },
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
