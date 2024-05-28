import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-textarea',
  templateUrl: './my-textarea.component.html',
  styleUrls: ['./my-textarea.component.css']
})
export class MyTextareaComponent implements OnInit {

  devForm: FormGroup = new FormGroup({
    devList: new FormArray([])
  });

  getDevFields(): FormGroup{
    return new FormGroup({
     dev_name: new FormControl(''),
     dev_office: new FormControl(''),
     dev_salary: new FormControl(''),
    });
  }

  devListArray(){
    return this.devForm.get('DeveloperList') as FormArray;
  }

  addDev(i: number){
    this.devListArray().push(this.getDevFields());
  }

  removeDev(i: number){
    this.devListArray().removeAt(i);
  }

  getFormData(){
    console.log(this.devForm.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
