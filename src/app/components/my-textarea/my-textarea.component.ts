import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface NotificationTemplate {
  smsTemplate: string;
  emailTemplate: string;
  notificationTitle: string;
}

interface Action {
  actionType: string;
  args: {
    frenchNotificationTemplate: NotificationTemplate;
    englishNotificationTemplate: NotificationTemplate;
    kinyarwandaNotificationTemplate: NotificationTemplate;
  };
}

interface Developer {
  state: string;
  id: number;
  startState: string;
  event: string;
  endStateOne: {
    stateName: string;
    stateCode: string;
    breakingAction?: {
      actionType: string;
      args: any;
    };
    nonBreakingActionList: Action[];
  };
}

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
      state: '',
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
    try {
      const formValue = this.devForm.value;
      const existingData: Developer[] = JSON.parse(localStorage.getItem('iremboWorkflow') || '[]');
      const newData: Developer[] = [...existingData, ...formValue.devList.map((dev: any) => {
        // Ensure breakingAction is included even if it's null or empty
        if (!dev.endStateOne.breakingAction || !dev.endStateOne.breakingAction.actionType.trim()) {
          dev.endStateOne.breakingAction = null;
        }
        return dev;
      })];
      localStorage.setItem('iremboWorkflow', JSON.stringify(newData));
      localStorage.setItem('idCounter', this.idCounter.toString());
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }

  getNextId(): number {
    this.idCounter += 1;
    return this.idCounter;
  }

  createDevGroup(dev: Developer): FormGroup {
    return this.fb.group({
      id: dev.id,
      startState: dev.startState,
      event: dev.event,
      state: dev.state || '', // Add this line to handle the state property
      endStateOne: this.fb.group({
        stateName: dev.endStateOne.stateName,
        stateCode: dev.endStateOne.stateCode,
        breakingAction: dev.endStateOne.breakingAction && dev.endStateOne.breakingAction.actionType.trim() !== '' ?
          this.fb.group({
            actionType: dev.endStateOne.breakingAction.actionType
          }) : null,
        nonBreakingActionList: new FormArray(dev.endStateOne.nonBreakingActionList.map((action: Action) => this.createNonBreakingActionGroup(action)))
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
