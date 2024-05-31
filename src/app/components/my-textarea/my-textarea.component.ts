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
  formId: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.loadFormData();
    if (this.devListArray().length === 0) {
      this.addDev();
    }
  }

  getDevFields(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.generateId()),
      startState: new FormControl(''),
      event: new FormControl(''),
      stateCode: new FormControl(''),
      endStateOne: new FormGroup({
        stateName: new FormControl(''),
        stateCode: new FormControl(''),
        breakingAction: new FormGroup({
          actionType: new FormControl(''),
          args: new FormControl('')
        }),
        nonBreakingActionList: new FormArray<FormGroup>([this.createNonBreakingActionFormGroup()])
      })
    });
  }

  createNonBreakingActionFormGroup(): FormGroup {
    return new FormGroup({
      actionType: new FormControl(''),
      args: new FormControl('')
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

  nonBreakingActions(devIndex: number): FormArray<FormGroup> {
    return (this.devListArray().at(devIndex).get('endStateOne') as FormGroup).get('nonBreakingActionList') as FormArray<FormGroup>;
  }

  addNonBreakingAction(devIndex: number): void {
    this.nonBreakingActions(devIndex).push(this.createNonBreakingActionFormGroup());
  }

  removeNonBreakingAction(devIndex: number, actionIndex: number): void {
    this.nonBreakingActions(devIndex).removeAt(actionIndex);
  }

  generateId(): number {
    let currentId = Number(localStorage.getItem('currentId')) || 0;
    currentId += 1;
    localStorage.setItem('currentId', currentId.toString());
    return currentId;
  }

  saveFormData(): void {
    const formData = JSON.stringify(this.devForm.value);
    localStorage.setItem('devFormData', formData);
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
        id: dev.id || this.generateId(),
        startState: dev.startState,
        event: dev.event,
        stateCode: dev.stateCode,
        endStateOne: {
          stateName: dev.endStateOne.stateName,
          stateCode: dev.endStateOne.stateCode,
          breakingAction: dev.endStateOne.breakingAction,
          nonBreakingActionList: dev.endStateOne.nonBreakingActionList
        }
      });

      const nonBreakingActionsArray = devGroup.get('endStateOne')?.get('nonBreakingActionList') as FormArray<FormGroup>;
      nonBreakingActionsArray.clear();
      dev.endStateOne.nonBreakingActionList.forEach((action: any) => {
        const actionGroup = this.createNonBreakingActionFormGroup();
        actionGroup.patchValue(action);
        nonBreakingActionsArray.push(actionGroup);
      });

      formArray.push(devGroup);
    });
    return formArray;
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent the default form submission
    this.saveFormData(); // Save the form data to local storage
    console.log('Form submitted and saved:', this.devForm.value); // For debugging
  }
}
