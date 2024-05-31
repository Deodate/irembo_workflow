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
    this.addDev(); // Initialize with one developer
  }

  devListArray() {
    return this.devForm.get('devList') as FormArray;
  }

  addDev() {
    const devGroup = new FormGroup({
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
        nonBreakingActionList: new FormArray<FormGroup>([])
      })
    });
    this.devListArray().push(devGroup);
  }

  nonBreakingActions(i: number) {
    return (this.devListArray().at(i).get('endStateOne') as FormGroup).get('nonBreakingActionList') as FormArray;
  }

  addNonBreakingAction(i: number) {
    const actionGroup = new FormGroup({
      actionType: new FormControl(''),
      args: new FormControl('')
    });
    this.nonBreakingActions(i).push(actionGroup);
  }

  removeNonBreakingAction(i: number, j: number) {
    this.nonBreakingActions(i).removeAt(j);
  }

  addNonBreakingActionToFirst() {
    this.addNonBreakingAction(0); // Assuming you want to add to the first developer
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.devForm.value);
  }

  saveFormData() {
    localStorage.setItem('devForm', JSON.stringify(this.devForm.value));
  }

  loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('devForm') || '{}');
    if (savedData && savedData.devList) {
      this.devForm.setControl('devList', new FormArray(savedData.devList.map((dev: any) => this.createDevGroup(dev))));
    }
  }

  createDevGroup(dev: any): FormGroup {
    return new FormGroup({
      startState: new FormControl(dev.startState),
      event: new FormControl(dev.event),
      stateCode: new FormControl(dev.stateCode),
      endStateOne: new FormGroup({
        stateName: new FormControl(dev.endStateOne.stateName),
        stateCode: new FormControl(dev.endStateOne.stateCode),
        breakingAction: new FormGroup({
          actionType: new FormControl(dev.endStateOne.breakingAction.actionType),
          args: new FormControl(dev.endStateOne.breakingAction.args)
        }),
        nonBreakingActionList: new FormArray(dev.endStateOne.nonBreakingActionList.map((action: any) => new FormGroup({
          actionType: new FormControl(action.actionType),
          args: new FormControl(action.args)
        })))
      })
    });
  }
}
