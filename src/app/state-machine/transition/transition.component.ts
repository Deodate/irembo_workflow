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

  @Output() selectedTransition: EventEmitter<transitionConfig> = new EventEmitter<transitionConfig>();
  selectedCreateEvent: any;

  @Input() config!: transitionConfig;

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

  handleClick() {
    this.showData = true;
    this.selectedTransition.emit(this.config)
  }

  handleCreate(event: any) {
    this.text = event;
    console.log("handle create")
  }

}

