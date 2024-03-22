import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon'; 
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { JiraComponent } from './components/jira/jira.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from "@angular/material/list";
import { AlertComponent } from './components/sidenavbar/alert/alert.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { NgxDomarrowModule } from 'ngx-domarrow';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransitionComponent } from './transition/transition.component';
import { StateMachineComponent } from './state-machine/state-machine.component';
import { StateComponent } from './state-machine/state/state.component'; // Added MatFormFieldModule
import { TransitionNewComponent } from './state-machine/transition/transition.component';
import { SlotComponent } from './state-machine/slot/slot.component';

@NgModule({
  declarations: [
    AppComponent,
    JiraComponent,
    HeaderComponent,
    AlertComponent,
    TransitionComponent,
    TransitionNewComponent,
    StateMachineComponent,
    StateComponent,
    SlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    NgxDomarrowModule,
    MatDialogModule,
    MatFormFieldModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
