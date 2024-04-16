import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  taskArray = [{taskName: 'Testing', isCompleted: false, isEditable: true}];

  onSubmit(form: NgForm){

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: true
  
    })
  }

  

  onDelete(index: number){
    console.log(index);

    this.taskArray.splice(index, 1)
  }

  onEdit(index: number){

    this.taskArray[index].isEditable = true;
  }

  onSave(index: number, newtask: string){
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
  }

  onCheck(index: number){
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index]

  }

  @Input() namedata: any;
  @Input() moneydata: any;
  @Input() objdata:any;
  campus:any;

  @Input() dataupdateevent= new EventEmitter<string>();
 
  listarray: { name: string; money: string; editMode: boolean; }[] = [];


  constructor(private service:MasterService) { 
    this.listarray=this.service.GetData().map(item => ({ ...item, editMode: false }));
  }

  updatelist(obj:any){
    this.listarray.push(obj);
    return obj.name + " added! ";
  }

  toggleEditMode(item: any) {
    item.editMode = !item.editMode;
  }


  updateData(item: any) {
    item.editMode = false;
  }

  ngOnInit(): void {
    this.campus=sessionStorage.getItem("name")!=null?sessionStorage.getItem("name"):"";
  }

}
