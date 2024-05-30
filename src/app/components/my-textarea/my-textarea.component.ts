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

  createTechnologyFormGroup(): FormGroup {
    return new FormGroup({
      technology: new FormControl(''),
      version: new FormControl('')
    });
  }

  devListArray(): FormArray<FormGroup> {
    return this.devForm.get('devList') as FormArray<FormGroup>;
  }

  addDev(): void {
    this.devListArray().push(this.getDevFields());
  }

  removeDev(index: number): void {
    this.devListArray().removeAt(index);
  }

  technologyFormGroup(devIndex: number): FormGroup {
    return this.devListArray().at(devIndex).get('developerTechnology') as FormGroup;
  }

  technologyArray(devIndex: number): FormArray<FormGroup> {
    return this.technologyFormGroup(devIndex).get('developerTechnologyArray') as FormArray<FormGroup>;
  }

  addNewTechnology(devIndex: number): void {
    this.technologyArray(devIndex).push(this.createTechnologyFormGroup());
  }

  removeNewTechnology(devIndex: number, techIndex: number): void {
    this.technologyArray(devIndex).removeAt(techIndex);
  }

  getFormData(): void {
    console.log(this.devForm.value);
  }

  saveFormData(): void {
    const formData = JSON.stringify(this.devForm.value);
    localStorage.setItem('devFormData', formData);
    this.resetForm(); // Reset the form after saving
  }

  loadFormData(): void {
    const savedFormData = localStorage.getItem('devFormData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      this.devForm.setControl('devList', this.buildFormArray(parsedData.devList));
    }
  }

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

  resetForm(): void {
    this.devForm.reset();
    this.devForm.setControl('devList', new FormArray<FormGroup>([]));
    this.addDev(); // Add one initial developer form group
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent the default form submission
    this.saveFormData(); // Save the form data to local storage
    this.resetForm(); // Reset the form after saving
    console.log('Form submitted and saved:', this.devForm.value); // For debugging
  }
}
