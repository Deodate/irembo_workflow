import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
  getStateMachineComponentUniqueStartStates(): any {
    throw new Error('Method not implemented.');
  }
  onStartStateSelected($event: Event) {
    throw new Error('Method not implemented.');
  }

  @Output() formInitialized = new EventEmitter<FormGroup>();

  devForm: FormGroup;
  private idCounter: number;
  storedData: Developer[] = [];
  isEditing: boolean = false; // Add this line
  editIndex: number | null = null; // Add this line
  filteredData: any[] = [];
  searchText: string = '';


  search() {
    this.filteredData = this.storedData.filter(dev =>
      dev.startState.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log('Filtered Data:', this.filteredData); // Log the filtered data
  }

  constructor(private fb: FormBuilder) {
    this.devForm = this.fb.group({
      devList: this.fb.array([])
    });
    this.idCounter = 0;
  }

  ngOnInit(): void {
    this.loadInitialData();
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

  // Add this method to load initial data from local storage
  loadInitialData() {
    const data = JSON.parse(localStorage.getItem('iremboWorkflow') || '[]');
    this.storedData = data;
    this.filteredData = this.storedData;
  }
  // Add this method to edit developer data
  editDev(index: number) {
    this.isEditing = true; // Add this line
    this.editIndex = index; // Add this line
    const dev = this.storedData[index];
    this.devForm.setControl('devList', this.fb.array([this.createDevGroup(dev)]));
    // Open mat-expansion-panel
    const panel = document.getElementById('expansionPanel' + index);
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  updateDev() {
    if (this.editIndex !== null) {
      const formValue = this.devForm.value;
      this.storedData[this.editIndex] = formValue.devList[0]; // Update the stored data
      localStorage.setItem('iremboWorkflow', JSON.stringify(this.storedData)); // Save updated data to local storage
      this.isEditing = false; // Reset editing state
      this.editIndex = null; // Reset edit index
      this.devForm.reset(); // Clear the form
      this.devForm.setControl('devList', this.fb.array([])); // Clear the form array
      this.addDev(); // Add a new blank entry
    }
  }

  // Add this method to delete developer data
  deleteDev(index: number) {
    this.storedData.splice(index, 1); // Remove the developer
    localStorage.setItem('iremboWorkflow', JSON.stringify(this.storedData)); // Update local storage
    this.loadInitialData(); // Reload data
  }
}
