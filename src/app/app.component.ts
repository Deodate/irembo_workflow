import { Component, ViewChild, Renderer2, ElementRef, OnInit } from '@angular/core';
import { WorflowSample } from './sample-workflowy';
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
export class AppComponent implements OnInit {

  @ViewChild('myModel') model: ElementRef | undefined;
  developerObj: developer = new developer();
  developerList: developer[] = [];
  _courseList: Course[] = [];
  _student: student = new student();
  _studentlist:student[]=[];
  uniquekey:number=0;

  @ViewChild(CourseComponent) viewdata !: CourseComponent;

  ngOnInit(): void {
    this.getCourses();

    const localData = localStorage.getItem("courseOne");
    if (localData != null) {
      this.developerList = JSON.parse(localData)
    }
  }

  onSubmits(){
    let index = this._studentlist.findIndex(x=>x.ids==this._student.ids)
  this._student.courseid = this._courseList.filter(x=>x.isselected==true).map(x=>x.ids).join(",").toString();
  this._student.coursename= this._courseList.filter(x=>x.isselected==true).map(x=>x.names).join(",").toString();

  if(index == -1)
  {
    this.uniquekey = this.uniquekey+ 1;
    this._student.ids=this.uniquekey;
    this._studentlist.push(this._student);
  }else{
   this._studentlist[index]=this._student;
  }
  
 
  this._student = new student();
  
  this.getCourses();
  }

  editt(item:student){
  let selectedcourseidlist=item.courseid.split(",");

  for(let i=0; i<selectedcourseidlist.length;i++){
    this._courseList.filter(x=>x.ids == Number(selectedcourseidlist[i])).map(x=>x.isselected=true);
  }
  this._student.names=item.names;
  this._student.ids=item.ids;
  }

  onChange(){
    console.log(this._courseList);
  }

  title = 'jiraworkflow';
  inputname = '';
  inputmoney = '';
  inputobj = { "name": "", "money": "" };
  response: any;
  TransferData(name: any, money: any) {
    // this.inputname=name;
    // this.inputmoney=money;
    this.inputobj = { "name": name, "money": money };
    // this.response= this.viewdata.updatelist(this.inputobj);
    this.service.SaveData(this.inputobj);
  }

  UpdateTitle(title: any) {
    this.title = title;
  }

  sampleWorkflow: any;

  constructor(private service: MasterService, private renderer: Renderer2) {
    sessionStorage.setItem("name", "Deodate Mugenzi");
    this.initSample()
    console.log("samplesflow", this.sampleWorkflow)

  }


  initSample() {
    // localStorage.setItem("iremboWorkflow", JSON.stringify(WorflowSample.sample2));
    this.sampleWorkflow = JSON.parse(localStorage.getItem("iremboWorkflow") || '{}');
  }

  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  openChecklist() {
    const model = document.getElementById("checklistModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }


  onEdit(item: developer) {
    this.developerObj = item;
    this.openModel();
  }

  closeModel() {
    this.developerObj = new developer;
    if (this.model instanceof ElementRef && this.model.nativeElement != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  closeChecklist() {
    const checklistModal = document.getElementById('checklistModal');
    if (checklistModal != null) {
      checklistModal.classList.remove('show');
    }
  }

  saveDeveloper() {
    debugger;
    const isLocalpresent = localStorage.getItem("courseOne");
    if (isLocalpresent != null) {
      const oldArray = JSON.parse(isLocalpresent);
      this.developerObj.id = oldArray.length + 1;
      oldArray.push(this.developerObj);
      this.developerList = oldArray;
      localStorage.setItem('courseOne', JSON.stringify(oldArray));

    } else {
      const newArr = [];
      newArr.push(this.developerObj);
      this.developerObj.id = 1;
      this.developerList = newArr;
      localStorage.setItem('courseOne', JSON.stringify(newArr));
    }
    this.closeModel();
  }

  onDelete(item: developer) {
    const isDelete = confirm("Are you sure want to delete");
    if (isDelete) {
      const currentRecord = this.developerList.findIndex(m => m.id === this.developerObj.id);
      this.developerList.splice(currentRecord, 1);
      localStorage.setItem('courseOne', JSON.stringify(this.developerList));
    }

  }

  updateDeveloper() {
    const currentRecord = this.developerList.find(m => m.id === this.developerObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.developerObj.name;
      currentRecord.contacts = this.developerObj.contacts;
      currentRecord.mobileno = this.developerObj.mobileno;
      currentRecord.email = this.developerObj.email;
    };
    localStorage.setItem('courseOne', JSON.stringify(this.developerList));
    this.closeModel();
  }


  getCourses(){
    this._courseList=[
      { ids: 1, names: "C#", isselected: false },
      { ids: 2, names: "Maths", isselected: false },
      { ids: 3, names: "Python", isselected: false },
      { ids: 4, names: "Java", isselected: false },
      { ids: 5, names: "PHP", isselected: false },
      { ids: 6, names: "Biology", isselected: false }
    ]
  }

}
class Course{
  ids: number = 0;
  names: string = '';
  isselected: boolean = false;
}

class student{
  ids: number = 0;
  names: string = '';
  courseid: string = '';
  coursename:string = '';
}

export class developer {
  id: number;
  name: string;
  mobileno: string;
  email: string;
  contacts: string;

  constructor() { this.id = 0; this.name = '', this.mobileno = '', this.email = '', this.contacts = '' }

}



