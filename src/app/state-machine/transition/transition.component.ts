import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SlotType, transitionConfig } from '../models';
import { SlotComponent } from '../slot/slot.component';

@Component({
  selector: 'app-transition-new',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.css']
})
export class TransitionNewComponent implements OnInit {

  @Input()
  config!: transitionConfig;

  SlotTypeEnum = SlotType;

  @ViewChildren(SlotComponent) slots!: QueryList<SlotComponent>;

  @ViewChild("endStateOne") endStateOne!: ElementRef;

  @ViewChild("endStateTwo") endStateTwo!: ElementRef;

  constructor( public el: ElementRef) { }

  get inputSlot() : SlotComponent | undefined {
    return this.slots.find((s) => s.slotType == SlotType.Input)
  }

  get outputSlot() : SlotComponent | undefined {
    return this.slots.find((s) => s.slotType == SlotType.Output)
  }

  ngOnInit(): void {
  }

}
