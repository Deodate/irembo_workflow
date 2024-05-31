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

  constructor() { }

  ngOnInit(): void {
    this.addDev(); // Initialize with one developer
    this.loadFormData(); // Load form data from local storage
  }

  devListArray(): FormArray {
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
        nonBreakingActionList: new FormArray([])
      })
    });
    this.devListArray().push(devGroup);
  }

  nonBreakingActions(i: number): FormArray {
    return (this.devListArray().at(i).get('endStateOne') as FormGroup).get('nonBreakingActionList') as FormArray;
  }

  addNonBreakingAction(i: number) {
    const actionGroup = new FormGroup({
      actionType: new FormControl('NOTIFICATION'),
      args: new FormGroup({
        frenchNotificationTemplate: new FormGroup({
          smsTemplate: new FormControl(''),
          emailTemplate: new FormControl(''),
          notificationTitle: new FormControl('')
        }),
        englishNotificationTemplate: new FormGroup({
          smsTemplate: new FormControl(''),
          emailTemplate: new FormControl(''),
          notificationTitle: new FormControl('')
        }),
        kinyarwandaNotificationTemplate: new FormGroup({
          smsTemplate: new FormControl(''),
          emailTemplate: new FormControl(''),
          notificationTitle: new FormControl('')
        })
      })
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
    this.saveFormData();
    this.devForm.reset(); // Reset the form
  }

  saveFormData() {
    const formValue = this.devForm.value;
    localStorage.setItem('devForm', JSON.stringify(formValue));
  }

  loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('devForm') || '{}');
    if (savedData && savedData.devList) {
      const devList = new FormArray(savedData.devList.map((dev: any) => this.createDevGroup(dev)));
      this.devForm.setControl('devList', devList);
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
          args: new FormGroup({
            frenchNotificationTemplate: new FormGroup({
              smsTemplate: new FormControl(action.args.frenchNotificationTemplate.smsTemplate),
              emailTemplate: new FormControl(action.args.frenchNotificationTemplate.emailTemplate),
              notificationTitle: new FormControl(action.args.frenchNotificationTemplate.notificationTitle)
            }),
            englishNotificationTemplate: new FormGroup({
              smsTemplate: new FormControl(action.args.englishNotificationTemplate.smsTemplate),
              emailTemplate: new FormControl(action.args.englishNotificationTemplate.emailTemplate),
              notificationTitle: new FormControl(action.args.englishNotificationTemplate.notificationTitle)
            }),
            kinyarwandaNotificationTemplate: new FormGroup({
              smsTemplate: new FormControl(action.args.kinyarwandaNotificationTemplate.smsTemplate),
              emailTemplate: new FormControl(action.args.kinyarwandaNotificationTemplate.emailTemplate),
              notificationTitle: new FormControl(action.args.kinyarwandaNotificationTemplate.notificationTitle)
            })
          })
        })))
      })
    });
  }
}
