import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SlotType, stateConfig, transitionConfig } from '../models';
import { SlotComponent } from '../slot/slot.component';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/form/form.component';
import { createNewTransitions } from '../state-machine.component';

@Component({
  selector: 'app-transition-new',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.css']
})
export class TransitionNewComponent implements OnInit {
i: any;
  creationForm: any;
onUpdate(arg0: any,arg1: any) {
throw new Error('Method not implemented.');
}

  @Input() newTransitionsList: createNewTransitions[] = [];
  @Input() data: string = '';  
  @Input() workflows: stateConfig[] | undefined;
  
  @Input() item: any;
  showModal: any;
  transition: any;
  showData: boolean | undefined;   
  displayData: any;
  transitionConfigs: any;
  sample2: any;
  iremboTask: any;
  names: any;
  text: string = '';

  constructor(private dialogRef: MatDialog, public el: ElementRef) { } 

  @Output() selectedTransition: EventEmitter<createNewTransitions> = new EventEmitter<createNewTransitions>();
  // selectedCreateEvent: any;
  // @Output() selectedTransition: EventEmitter<createNewTransitions> = new EventEmitter<createNewTransitions>();

  // @Output() onUpdated: EventEmitter<{ item: stateConfig, index: number }> = new EventEmitter<{ item: stateConfig, index: number }>();
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
      nonBreakingAction: ''
    };

    if (nonBreakingActionString) {
      newTransition.endStateOne.nonBreakingAction = nonBreakingActionString;
    }
    
    this.selectedTransition.emit(newTransition);
  }


  // updateConfig(config: transitionConfig, index: number) {
  //   this.onUpdated.emit({ config: config, index: index });
  // }

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

  }

  openModal() {
    this.showModal.emit();
  }

  // onEdit(item: createNewTransitions){
  //   this.newTransitionsObj = item;
  // }

handleClick() {
  console.log("Config data:", this.config);
  
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
    nonBreakingAction: nonBreakingActionString
  };
  
  this.selectedTransition.emit(newTransition);
  this.setFormData(this.config); // Set form data when clicking the card
}

setFormData(config: transitionConfig) {
  this.creationForm.patchValue({
    startState: config.startState,
    event: config.event,
    stateCode: config.endStateOne?.stateCode,
    breakingAction: config.endStateOne?.breakingAction?.actionType,
    actionType: config.endStateOne?.nonBreakingActionList && config.endStateOne.nonBreakingActionList.length > 0 ? config.endStateOne.nonBreakingActionList[0]?.actionType : '' // Check if nonBreakingActionList is not empty
  });
}
  
  // handleCreate(event: any) {
  //   this.text = event;
  //   console.log("handle create")
  // }

}

