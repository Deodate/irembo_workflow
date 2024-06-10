import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SlotType, stateConfig, transitionConfig } from '../models';
import { SlotComponent } from '../slot/slot.component';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/form/form.component';
import { createNewTransitions } from '../state-machine.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transition-new',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.css']
})
export class TransitionNewComponent implements OnInit {
  i: any;
  creationForm!: FormGroup;
  devForm!: FormGroup;
  transitionToEdit: any = {};
onUpdate(arg0: any,arg1: any) {
throw new Error('Method not implemented.');
}

  @Input() newTransitionsList: createNewTransitions[] = [];
  @Input() workflows: stateConfig[] | undefined;
  @Input() data: transitionConfig | undefined;
  
  
  @Input() item: any;
  showModal: any;
  transition: any;
  showData: boolean | undefined;   
  transitionConfigs: any;
  sample2: any;
  iremboTask: any;
  names: any;
  text: string = '';

  selectedBreakingAction: string | null = null;

  constructor(private dialogRef: MatDialog, public el: ElementRef, private fb: FormBuilder) {
    this.creationForm = this.fb.group({
      startState: [''],
      event: [''],
      stateCode: [''],
      breakingAction: [''],
      actionType: ['']
    });
  } 

  @Output() selectedTransition: EventEmitter<createNewTransitions> = new EventEmitter<createNewTransitions>();
  @Output() displayData: EventEmitter<transitionConfig> = new EventEmitter<transitionConfig>();

  @Output() onUpdated: EventEmitter<transitionConfig> = new EventEmitter<transitionConfig>();

  @Input() config!: transitionConfig;
  
  onCardClick(config: transitionConfig, index: number) {
    const nonBreakingActionList = config.endStateOne?.nonBreakingActionList?.map(action => action.actionType) || [];
    const nonBreakingActionString = nonBreakingActionList.join(', ');

    const newTransition: createNewTransitions = {
      id: index,
      event: config.event,
      startState: config.startState,
      endStateOne: {
        stateName: config.endStateOne?.stateName || '',
        stateCode: config.endStateOne?.stateCode || '',
        breakingAction: config.endStateOne?.breakingAction || null,
        nonBreakingActionList: config.endStateOne?.nonBreakingActionList || [],
      },
      endStateTwo: config.endStateTwo || null,
      state: '',
      breakingAction: '',
      nonBreakingAction: '',
      notificationTitle: undefined
    };

    if (nonBreakingActionString) {
      newTransition.endStateOne.nonBreakingAction = nonBreakingActionString;
    }

    this.selectedTransition.emit(newTransition);
    this.setFormData(this.config); // Set form data when clicking the card
    this.displayData.emit(this.config); // Emit the transitionConfig object
  }
  

  SlotTypeEnum = SlotType;

  @ViewChildren(SlotComponent) slots!: QueryList<SlotComponent>;

  @ViewChild("endStateOne") endStateOne!: ElementRef;

  @ViewChild("endStateTwo") endStateTwo!: ElementRef;

  get inputSlot(): SlotComponent | undefined {
    return this.slots.find((s) => s.slotType == SlotType.Input)
  }

  get outputSlot(): SlotComponent | undefined {
    return this.slots.find((s) => s.slotType == SlotType.Output)
  }

  ngOnInit(): void {
    this.selectedTransition.subscribe((data: transitionConfig) => {
      this.transitionToEdit = data;
    });
  }

  openModal() {
    this.showModal.emit();
  }

  handleClick() {
    console.log("Config data:", this.config);

    if (this.config) {
        const nonBreakingActionList = this.config.endStateOne?.nonBreakingActionList?.map(action => action.actionType) || [];
        const nonBreakingActionString = nonBreakingActionList.join(', ');

        const newTransition: createNewTransitions = {
          id: this.config.id || 0,
          event: this.config.event || '',
          startState: this.config.startState || '',
          endStateOne: {
            stateName: this.config.endStateOne?.stateName || '',
            stateCode: this.config.endStateOne?.stateCode || '',
            breakingAction: this.config.endStateOne?.breakingAction || null,
            nonBreakingActionList: this.config.endStateOne?.nonBreakingActionList || [],
          },
          endStateTwo: this.config.endStateTwo || null,
          state: '',
          breakingAction: '',
          nonBreakingAction: nonBreakingActionString,
          notificationTitle: undefined
        };

        this.selectedTransition.emit(newTransition);
        this.setFormData(this.config); // Set form data when clicking the card
        this.displayData.emit(this.config); // Emit the transitionConfig object
    }
}

setFormData(config: transitionConfig) {
  this.creationForm.patchValue({
      startState: config.startState,
      event: config.event,
      stateCode: config.endStateOne?.stateCode || '', 
      breakingAction: config.endStateOne?.breakingAction?.actionType || '', 
      actionType: config.endStateOne?.nonBreakingActionList && config.endStateOne.nonBreakingActionList.length > 0 ? config.endStateOne.nonBreakingActionList[0]?.actionType : '' // Check if nonBreakingActionList is not empty
  });
}

// selectTransition(config: transitionConfig) {
//   const newTransition: createNewTransitions = {
//     id: config.id,
//     event: config.event,
//     startState: config.startState,
//     endStateOne: {
//       stateName: config.endStateOne?.stateName || '',
//       stateCode: config.endStateOne?.stateCode || '',
//       breakingAction: config.endStateOne?.breakingAction || null,
//       nonBreakingActionList: config.endStateOne?.nonBreakingActionList || [],
//     },
//     endStateTwo: config.endStateTwo || null,
//     state: '',
//     breakingAction: '',
//     nonBreakingAction: '',
//     notificationTitle: undefined
//   };

//   this.selectedTransition.emit(newTransition);
// }

selectTransition(config: transitionConfig) {
  const newTransition: createNewTransitions = {
    id: config.id,
    event: config.event,
    startState: config.startState,
    endStateOne: {
      stateName: config.endStateOne?.stateName || '',
      stateCode: config.endStateOne?.stateCode || '',
      breakingAction: config.endStateOne?.breakingAction || null,
      nonBreakingActionList: config.endStateOne?.nonBreakingActionList?.map(action => ({
        actionType: action.actionType,
        args: {
          frenchNotificationTemplate: {
            smsTemplate: action.args.frenchNotificationTemplate.smsTemplate,
            emailTemplate: action.args.frenchNotificationTemplate.emailTemplate,
            notificationTitle: action.args.frenchNotificationTemplate.notificationTitle
          },
          englishNotificationTemplate: {
            smsTemplate: action.args.englishNotificationTemplate.smsTemplate,
            emailTemplate: action.args.englishNotificationTemplate.emailTemplate,
            notificationTitle: action.args.englishNotificationTemplate.notificationTitle
          },
          kinyarwandaNotificationTemplate: {
            smsTemplate: action.args.kinyarwandaNotificationTemplate.smsTemplate,
            emailTemplate: action.args.kinyarwandaNotificationTemplate.emailTemplate,
            notificationTitle: action.args.kinyarwandaNotificationTemplate.notificationTitle
          }
        }
      })) || [],
    },
    endStateTwo: config.endStateTwo || null,
    state: '',
    breakingAction: '',
    nonBreakingAction: '',
    notificationTitle: undefined
  };

  this.selectedTransition.emit(newTransition);
}



displayTransitionData(config: transitionConfig) {
  this.displayData.emit(config);
}

}

