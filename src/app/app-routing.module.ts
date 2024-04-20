import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { JiraComponent } from './components/jira/jira.component';
import { AlertComponent } from './components/sidenavbar/alert/alert.component';
import { AppComponent } from './app.component';
import { TransitionComponent } from './transition/transition.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodolistComponent } from './course/todolist/todolist.component';
import { NavbarsComponent } from './course/navbars/navbars.component';

export const routes: Routes = [
  { path: 'jira',component:JiraComponent},
  { path: 'header',component:HeaderComponent},
  { path: 'transition',component:TransitionComponent },
  { path: 'alert',component:AlertComponent },
   {path: 'navbar',component:NavbarComponent},
   {path:'todolist', component: TodolistComponent},
   {path: 'navbars', component: NavbarsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
