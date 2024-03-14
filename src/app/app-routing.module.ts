import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { JiraComponent } from './components/jira/jira.component';
import { AlertComponent } from './components/sidenavbar/alert/alert.component';

export const routes: Routes = [
  {
    path: '',
    component: JiraComponent,
    children: [{path: '', component: JiraComponent}
  ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
