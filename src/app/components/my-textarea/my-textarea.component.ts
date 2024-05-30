import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-textarea',
  templateUrl: './my-textarea.component.html',
  styleUrls: ['./my-textarea.component.css']
})
export class MyTextareaComponent implements OnInit {

  devForm: FormGroup = new FormGroup({
    devList: new FormArray<FormGroup>([])
  });

  constructor() { }

  ngOnInit(): void {
    this.loadFormData();
    if (this.devListArray().length === 0) {
      this.addDev();
    }
  }

  // Method to create a new developer form group
  getDevFields(): FormGroup {
    return new FormGroup({
      dev_name: new FormControl(''),
      dev_office: new FormControl(''),
      dev_salary: new FormControl(''),
      developerTechnology: new FormGroup({
        developerTechnologyArray: new FormArray<FormGroup>([this.createTechnologyFormGroup()])
      })
    });
  }

  // Method to create a new technology form group
  createTechnologyFormGroup(): FormGroup {
    return new FormGroup({
      technology: new FormControl(''),
      version: new FormControl('')
    });
  }

  // Helper to get the developer list form array
  devListArray(): FormArray<FormGroup> {
    return this.devForm.get('devList') as FormArray<FormGroup>;
  }

  // Add a new developer form group to the developer list
  addDev(): void {
    this.devListArray().push(this.getDevFields());
  }

  // Remove a developer form group from the developer list
  removeDev(index: number): void {
    this.devListArray().removeAt(index);
  }

  // Get the technology form group for a specific developer
  technologyFormGroup(devIndex: number): FormGroup {
    return this.devListArray().at(devIndex).get('developerTechnology') as FormGroup;
  }

  // Get the technology form array for a specific developer
  technologyArray(devIndex: number): FormArray<FormGroup> {
    return this.technologyFormGroup(devIndex).get('developerTechnologyArray') as FormArray<FormGroup>;
  }

  // Add a new technology form group to the technology list of a specific developer
  addNewTechnology(devIndex: number): void {
    this.technologyArray(devIndex).push(this.createTechnologyFormGroup());
  }

  // Remove a technology form group from the technology list of a specific developer
  removeNewTechnology(devIndex: number, techIndex: number): void {
    this.technologyArray(devIndex).removeAt(techIndex);
  }

  // Log the form data to the console
  getFormData(): void {
    console.log(this.devForm.value);
  }

  // Save form data to local storage
  saveFormData(): void {
    const formData = JSON.stringify(this.devForm.value);
    localStorage.setItem('devFormData', formData);
  }

  // Load form data from local storage
  loadFormData(): void {
    const savedFormData = localStorage.getItem('devFormData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      this.devForm.setControl('devList', this.buildFormArray(parsedData.devList));
    }
  }

  // Helper to build form array from saved data
  buildFormArray(data: any[]): FormArray<FormGroup> {
    const formArray = new FormArray<FormGroup>([]);
    data.forEach(dev => {
      const devGroup = this.getDevFields();
      devGroup.patchValue({
        dev_name: dev.dev_name,
        dev_office: dev.dev_office,
        dev_salary: dev.dev_salary
      });
      const developerTechnologyGroup = devGroup.get('developerTechnology') as FormGroup;
      const techArray = developerTechnologyGroup?.get('developerTechnologyArray') as FormArray<FormGroup>;
      techArray.clear();
      dev.developerTechnology.developerTechnologyArray.forEach((tech: { technology: any; version: any; }) => {
        const techGroup = this.createTechnologyFormGroup();
        techGroup.patchValue({
          technology: tech.technology,
          version: tech.version
        });
        techArray.push(techGroup);
      });
      formArray.push(devGroup);
    });
    return formArray;
  }
}
