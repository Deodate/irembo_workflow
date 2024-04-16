import { Component, ViewChild, Renderer2, ElementRef, OnInit  } from '@angular/core';
import { WorflowSample } from './sample-workflow';
import { CourseComponent } from './courses/course/course.component';
import { MasterService } from './courses/service/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  // imports: FormsModule,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('myModel') model : ElementRef | undefined;
  developerObj: developer = new developer();
  developerList: developer[] = [];

  @ViewChild(CourseComponent) viewdata !:CourseComponent;

  ngOnInit(): void {
      const localData = localStorage.getItem("courseOne");
      if(localData != null){
        this.developerList = JSON.parse(localData)
      }
  }

  title = 'jiraworkflow';
  inputname='';
  inputmoney='';
  inputobj={"name":"","money":""};
  response:any;
  TransferData(name:any,money:any){
  // this.inputname=name;
  // this.inputmoney=money;
  this.inputobj={"name":name,"money":money};
  // this.response= this.viewdata.updatelist(this.inputobj);
  this.service.SaveData(this.inputobj);
  }

  UpdateTitle(title:any){
    this.title=title;
  }

  sampleWorkflow: any;

  constructor(private service:MasterService, private renderer: Renderer2) {
    sessionStorage.setItem("name", "Deodate Mugenzi");
    this.initSample()
    console.log("sampleflow", this.sampleWorkflow)
  }


  initSample() {
    this.sampleWorkflow = WorflowSample.sample2;
    // this.sampleWorkflow = WorflowSample.sample1;
    
  }

  openModel(){
   
    const model =document.getElementById("myModal");
    if(model != null){
      model.style.display = 'block'
    }
  }

  onEdit(item: developer){
 this.developerObj = item;
 this.openModel();
  }

  closeModel() {
    this.developerObj = new developer;
    if (this.model instanceof ElementRef && this.model.nativeElement != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  saveDeveloper(){
    debugger;
    const isLocalpresent = localStorage.getItem("courseOne");
    if(isLocalpresent != null){
      const oldArray = JSON.parse(isLocalpresent);
      this.developerObj.id = oldArray.length + 1;
      oldArray.push(this.developerObj);
      this.developerList = oldArray;
      localStorage.setItem('courseOne',JSON.stringify(oldArray));

    } else {
      const newArr = [];
      newArr.push(this.developerObj);
      this.developerObj.id = 1;
      this.developerList = newArr;
      localStorage.setItem('courseOne',JSON.stringify(newArr));
    }
    this.closeModel();
  }

  onDelete(item: developer){
   const isDelete = confirm("Are you sure want to delete");
   if(isDelete){
    const currentRecord = this.developerList.findIndex(m=> m.id === this.developerObj.id);
    this.developerList.splice(currentRecord,1);
    localStorage.setItem('courseOne',JSON.stringify(this.developerList));
   }

  }

  updateDeveloper() {
    const currentRecord = this.developerList.find(m=> m.id === this.developerObj.id);
    if(currentRecord != undefined){
      currentRecord.name = this.developerObj.name;
      currentRecord.contacts = this.developerObj.contacts;
      currentRecord.mobileno = this.developerObj.mobileno;
      currentRecord.email = this.developerObj.email;
    };
    localStorage.setItem('courseOne',JSON.stringify(this.developerList));
    this.closeModel();
  }

}
export class developer{
    id: number;
    name: string;
    mobileno: string;
    email: string;
    contacts: string;

    constructor( ){this.id = 0 ;this.name = '', this.mobileno = '', this.email = '', this.contacts = '' }

}

  

