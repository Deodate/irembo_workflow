import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SlotType, transitionConfig } from '../models';
import { SlotComponent } from '../slot/slot.component';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/form/form.component';

@Component({
  selector: 'app-transition-new',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.css']
})
export class TransitionNewComponent implements OnInit {
  @Input() item: any;
  showModal: any;

  constructor(private dialogRef: MatDialog, public el: ElementRef) {
  } 

  @Input()
  config!: transitionConfig;

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

}

