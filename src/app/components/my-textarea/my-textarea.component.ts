import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-textarea',
  templateUrl: './my-textarea.component.html',
  styleUrls: ['./my-textarea.component.css']
})
export class MyTextareaComponent implements OnInit {

  devForm: FormGroup;
  private idCounter: number;

  constructor(private fb: FormBuilder) {
    this.devForm = this.fb.group({
      devList: this.fb.array([])
    });
    this.idCounter = 0;
  }

  ngOnInit(): void {
    this.loadFormData();
    if (this.devListArray().length === 0) {
      this.addDev();
    }
  }

  devListArray(): FormArray {
    return this.devForm.get('devList') as FormArray;
  }

  addDev() {
    const devGroup = this.fb.group({
      id: this.getNextId(),
      startState: '',
      event: '',
      stateCode: '',
      endStateOne: this.fb.group({
        stateName: '',
        stateCode: '',
        breakingAction: this.fb.group({
          actionType: ''
        }),
        nonBreakingActionList: this.fb.array([])
      })
    });
    this.devListArray().push(devGroup);
  }

  nonBreakingActions(i: number): FormArray {
    return (this.devListArray().at(i).get('endStateOne') as FormGroup).get('nonBreakingActionList') as FormArray;
  }

  addNonBreakingAction(i: number) {
    const actionGroup = this.fb.group({
      actionType: 'NOTIFICATION',
      args: this.fb.group({
        frenchNotificationTemplate: this.fb.group({
          smsTemplate: '',
          emailTemplate: '',
          notificationTitle: ''
        }),
        englishNotificationTemplate: this.fb.group({
          smsTemplate: '',
          emailTemplate: '',
          notificationTitle: ''
        }),
        kinyarwandaNotificationTemplate: this.fb.group({
          smsTemplate: '',
          emailTemplate: '',
          notificationTitle: ''
        })
      })
    });
    this.nonBreakingActions(i).push(actionGroup);
  }

  removeNonBreakingAction(i: number, j: number) {
    this.nonBreakingActions(i).removeAt(j);
  }

  addNonBreakingActionToFirst() {
    this.addNonBreakingAction(0);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.saveFormData();
    this.devForm.reset();
    this.devForm.setControl('devList', this.fb.array([]));
    this.addDev();
  }

  saveFormData() {
    const formValue = this.devForm.value;
    localStorage.setItem('devForm', JSON.stringify(formValue));
    localStorage.setItem('idCounter', this.idCounter.toString());
  }

  loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('devForm') || '{}');
    if (savedData && savedData.devList) {
      const devList = new FormArray(savedData.devList.map((dev: any) => this.createDevGroup(dev)));
      this.devForm.setControl('devList', devList);
    }
    this.idCounter = parseInt(localStorage.getItem('idCounter') || '0', 10);
  }

  getNextId(): number {
    this.idCounter += 1;
    return this.idCounter;
  }

  createDevGroup(dev: any): FormGroup {
    return this.fb.group({
      id: dev.id,
      startState: dev.startState,
      event: dev.event,
      stateCode: dev.stateCode,
      endStateOne: this.fb.group({
        stateName: dev.endStateOne.stateName,
        stateCode: dev.endStateOne.stateCode,
        breakingAction: this.fb.group({
          actionType: dev.endStateOne.breakingAction.actionType
        }),
        nonBreakingActionList: new FormArray(dev.endStateOne.nonBreakingActionList.map((action: any) => this.createNonBreakingActionGroup(action)))
      })
    });
  }

  createNonBreakingActionGroup(action: any): FormGroup {
    return this.fb.group({
      actionType: action.actionType,
      args: this.fb.group({
        frenchNotificationTemplate: this.fb.group({
          smsTemplate: action.args.frenchNotificationTemplate.smsTemplate,
          emailTemplate: action.args.frenchNotificationTemplate.emailTemplate,
          notificationTitle: action.args.frenchNotificationTemplate.notificationTitle
        }),
        englishNotificationTemplate: this.fb.group({
          smsTemplate: action.args.englishNotificationTemplate.smsTemplate,
          emailTemplate: action.args.englishNotificationTemplate.emailTemplate,
          notificationTitle: action.args.englishNotificationTemplate.notificationTitle
        }),
        kinyarwandaNotificationTemplate: this.fb.group({
          smsTemplate: action.args.kinyarwandaNotificationTemplate.smsTemplate,
          emailTemplate: action.args.kinyarwandaNotificationTemplate.emailTemplate,
          notificationTitle: action.args.kinyarwandaNotificationTemplate.notificationTitle
        })
      })
    });
  }
}
