import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { JiraComponent } from './components/jira/jira.component';
import { AlertComponent } from './components/sidenavbar/alert/alert.component';
import { AppComponent } from './app.component';
import { TransitionComponent } from './transition/transition.component';

export const routes: Routes = [
  { path: 'jira/:id',component:JiraComponent},
  { path: 'header',component:HeaderComponent},
  { path: 'transition/:id',component:TransitionComponent },
  { path: 'alert',component:AlertComponent },
   
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
