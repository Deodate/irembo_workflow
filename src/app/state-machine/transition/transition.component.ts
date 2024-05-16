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
    this.setFormData(this.config); // Set form data when clicking the card
    this.displayData.emit(this.config); // Emit the transitionConfig object
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
    this.selectedTransition.subscribe((data: transitionConfig) => {
      this.transitionToEdit = data;
    });
  }

  openModal() {
    this.showModal.emit();
  }

  // onEdit(item: createNewTransitions){
  //   this.newTransitionsObj = item;
  // }

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
            nonBreakingAction: nonBreakingActionString
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
      stateCode: config.endStateOne?.stateCode || '', // Use empty string as default value if stateCode is undefined
      breakingAction: config.endStateOne?.breakingAction?.actionType || '', // Use empty string as default value if breakingAction is undefined
      actionType: config.endStateOne?.nonBreakingActionList && config.endStateOne.nonBreakingActionList.length > 0 ? config.endStateOne.nonBreakingActionList[0]?.actionType : '' // Check if nonBreakingActionList is not empty
  });
}

  // handleCreate(event: any) {
  //   this.text = event;
  //   console.log("handle create")
  // }

}

