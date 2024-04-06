import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SlotType } from '../models';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  @Input()
  slotType!: SlotType;

  isInput : boolean = false;

  @ViewChild("slot") port: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
     this.isInput = this.slotType == SlotType.Input;
  }

}
