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

  getDevFields(): FormGroup {
    return new FormGroup({
      dev_name: new FormControl(''),
      dev_office: new FormControl(''),
      dev_salary: new FormControl(''),
      developerTechnology: new FormGroup({
        developerTechnologyArray: new FormArray([this.putNewTechnology()])
      })
    });
  }

  devListArray() {
    return this.devForm.get('devList') as FormArray;
  }

  addDev() {
    this.devListArray().push(this.getDevFields());
  }

  removeDev(i: number) {
    this.devListArray().removeAt(i);
  }

  getFormData() {
    console.log(this.devForm.value);
  }

  technologyFormGroup(i: number) {
    return this.devListArray().at(i).get('developerTechnology') as FormGroup;
  }

  technologyArray(i: number) {
    return this.technologyFormGroup(i).get('developerTechnologyArray') as FormArray;
  }

  putNewTechnology() {
    return new FormGroup({
      technology: new FormControl(''),
      version: new FormControl('')
    })
  }

  addNewTechnology(i: number) {
    this.technologyArray(i).push(this.putNewTechnology());
  }

  removeNewTechnology(i: number, j: number) {
    this.technologyArray(i).removeAt(j);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
