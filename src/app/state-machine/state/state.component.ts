import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SlotType, stateConfig } from '../models';
import { SlotComponent } from '../slot/slot.component';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  @Input()
  config!: stateConfig;

  SlotTypeEnum = SlotType;

  @ViewChildren(SlotComponent) slots!: QueryList<SlotComponent>;

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
