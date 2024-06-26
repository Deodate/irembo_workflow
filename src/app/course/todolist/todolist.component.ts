import { CdkDragDrop, moveItemInArray, CdkDrag, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { iremboTask } from '../tasks';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : iremboTask [] = [];
  inprogress : iremboTask [] = [];
  paid: iremboTask [] = [];
  pending: iremboTask [] = [];
  resubmission: iremboTask [] = [];
  close: iremboTask [] = [];
  rejected: iremboTask [] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset();

  }

  onEdit(item:iremboTask, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;

  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  updatePayment() {
    if (this.updateIndex !== undefined && this.updateIndex >= 0 && this.updateIndex < this.inprogress.length) {
      this.inprogress[this.updateIndex].description = this.todoForm.value.item;
      this.todoForm.reset();
      this.updateIndex = undefined;
      this.isEditEnabled = false;
    }
  }

  updatePaid() {
    if (this.updateIndex !== undefined && this.updateIndex >= 0 && this.updateIndex < this.paid.length) {
      this.paid[this.updateIndex].description = this.todoForm.value.items;
      this.todoForm.reset();
      this.updateIndex = undefined;
      this.isEditEnabled = false;
    }
}
  
  
  deleteTask(i: number){
    this.tasks.splice(i,1)
  }

  deleteInProgressTask(i: number){
    this.inprogress.splice(i,1)
  }


  drop(event: CdkDragDrop<iremboTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}


