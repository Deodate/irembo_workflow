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
import { MatDividerModule} from '@angular/material/divider';
import { NgSelectModule } from '@ng-select/ng-select'; // Import NgSelectModule
import { MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransitionComponent } from './transition/transition.component';
import { StateMachineComponent } from './state-machine/state-machine.component';
import { StateComponent } from './state-machine/state/state.component'; // Added MatFormFieldModule
import { TransitionNewComponent } from './state-machine/transition/transition.component';
import { SlotComponent } from './state-machine/slot/slot.component';
import { StateMachineEditorComponent } from './state-machine-editor/state-machine-editor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { CourseComponent } from './courses/course/course.component';
import { TodolistComponent } from './course/todolist/todolist.component';
import { NavabarComponent } from './components/navabar/navabar.component';
import { NavbarsComponent } from './course/navbars/navbars.component';
import { MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { MyTextareaComponent } from './components/my-textarea/my-textarea.component';
// import { ToastrModule} from 'ngx-toastr';
import { NotifierComponent } from './notifier/notifier.component';
import { ProductComponent } from './product/product.component'


@NgModule({
  declarations: [
    AppComponent,
    JiraComponent,
    HeaderComponent,
    CourseComponent,
    AlertComponent,
    TransitionComponent,
    TransitionNewComponent,
    StateMachineComponent,
    StateComponent,
    SlotComponent,
    StateMachineEditorComponent,
    NavbarComponent,
    FormComponent,
    TodolistComponent,
    NavabarComponent,
    NavbarsComponent,
    MyTextareaComponent,
    NotifierComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    NgSelectModule, // Import NgSelectModule here
    MatGridListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatTabsModule,
    CommonModule,
    MatInputModule,
    MatDividerModule,
    MatFormFieldModule,
    DragDropModule,
    FormsModule,
    MatIconModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    DragDropModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    // ToastrModule.forRoot({

    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
