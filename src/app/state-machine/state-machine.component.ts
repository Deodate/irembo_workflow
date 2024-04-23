import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StateComponent } from './state/state.component';
import { TransitionNewComponent } from './transition/transition.component';
import { CdkDragDrop, CdkDragMove } from '@angular/cdk/drag-drop';
import { ApiService } from '../api.service';
import { IremboTransition, Workflow, irembo, stateConfig, transitionConfig } from './models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorflowSample } from '../sample-workflow';
import { ChangeDetectorRef } from '@angular/core';

declare var LeaderLine: any;

@Component({
  selector: 'app-state-machine',
  templateUrl: './state-machine.component.html',
  styleUrls: ['./state-machine.component.css']
})

export class StateMachineComponent implements OnInit, AfterViewInit {
  drop($event: CdkDragDrop<Workflow, any, any>) {
    throw new Error('Method not implemented.');
  }

  @Output() crateEmitter: EventEmitter<string> = new EventEmitter<string>();

  newTransitionsObj: createNewTransitions = new createNewTransitions();
  newTransitionsList: createNewTransitions[] = [];
  creationForm !: FormGroup;
  iremboTask: irembo[] = [];
  description: any;
  data: string = '';
  updateId: any;
  isEditEnabled: boolean = false;

  // createNew(){
  //   this.data = 'Deodate',
  //   this.iremboTask.push({
  //     description: this.creationForm.value.data
  //   })
  // }

  createNew() {
    this.selectedTransitions.push({
      description: this.creationForm.value.data
    });
    // this.creationForm.reset();
  }

  onUpdate(item: any, i: number) {
    this.creationForm.controls['item'].setValue(item.event);
    this.updateId = i;
    this.isEditEnabled = true;
  }


  @Input() config: transitionConfig | undefined = {
    description: '',
    names: '',
    name: '',
    startState: '',
    endStateOne: undefined,
    endStateTwo: undefined,
    position: { x: 0, y: 0 }
  };

  @Output() displayData: EventEmitter<transitionConfig> = new EventEmitter<transitionConfig>();
  selectedCreateEvent: any;
  startStateSelected: boolean = false;
  eventSelected: boolean = false;
  endStateSelected: boolean = false;
  breakingActionSelected: boolean = false;
  nonBreakingActionSelected: boolean = false;
  transition: any;
  showData: boolean = false;
  // creationForm: FormGroup = new FormGroup({});

  updateTransition(transition: any) {

  }

  getStateMachineComponentUniqueStartStates(): string[] {
    return StateMachineComponent.getUniqueStartStates();
  }

  public static getUniqueStartStates(): string[] {
    const uniqueStates = new Set<string>();
    WorflowSample.sample1.forEach((item) => uniqueStates.add(item.startState));
    WorflowSample.sample2.forEach((item) => uniqueStates.add(item.startState));
    return Array.from(uniqueStates);
  }

  getUniqueEvents(): string[] {
    const uniqueEvents = new Set<string>();
    WorflowSample.sample1.forEach((item) => uniqueEvents.add(item.event));
    WorflowSample.sample2.forEach((item) => uniqueEvents.add(item.event));
    return Array.from(uniqueEvents);
  }

  getUniqueBreakingActions(): string[] {
    const uniqueActions = new Set<string>();
    WorflowSample.sample1.forEach((item) => {
      if (item.endStateOne && item.endStateOne.breakingAction && item.endStateOne.breakingAction.actionType) {
        uniqueActions.add(item.endStateOne.breakingAction.actionType);
      }
    });
    WorflowSample.sample2.forEach((item) => {
      if (item.endStateOne && item.endStateOne.breakingAction && item.endStateOne.breakingAction.actionType) {
        uniqueActions.add(item.endStateOne.breakingAction.actionType);
      }
    });
    return Array.from(uniqueActions);
  }

  getUniqueNonBreakingActions(): string[] {
    const uniqueActions = new Set<string>();

    WorflowSample.sample1.forEach((item) => {
      if (item.endStateOne && item.endStateOne.nonBreakingActionList) {
        item.endStateOne.nonBreakingActionList.forEach((action) => {
          if (action.actionType) {
            uniqueActions.add(action.actionType);
          }
        });
      }
    });

    localStorage.setItem("key", JSON.stringify(WorflowSample.sample2));
    WorflowSample.sample2.forEach((item) => {
      if (item.endStateOne && item.endStateOne.nonBreakingActionList) {
        item.endStateOne.nonBreakingActionList.forEach((action) => {
          if (action.actionType) {
            uniqueActions.add(action.actionType);
          }
        });
      }
    });

    return Array.from(uniqueActions);
  }

  selectedStartState: string = '';
  selectedEvent: string = '';
  selectedEndState: string = '';
  selectedBreakingAction: string = '';
  selectedNonBreakingAction: string = '';
  selectedTransitions: any[] = [];
  transitionToEdit: transitionConfig = { description: '', names: '', name: '', startState: '', endStateOne: undefined, breakingAction: undefined, endStateTwo: undefined, position: { x: 0, y: 0 } };

  onStartStateSelected(event: any): void {
    const value = event.target?.value;
    if (value) {
      this.selectedStartState = value;
      this.startStateSelected = event.target.value !== 'Choose...';
    }
  }

  onAddButtonClick(): void {
    const selectedTransition = {
      startState: this.selectedStartState,
      event: this.selectedEvent,
      endState: this.selectedEndState,
      breakingAction: this.selectedBreakingAction,
      nonBreakingAction: this.selectedNonBreakingAction
    };


    this.selectedTransitions.push(selectedTransition);
    this.clearSelectedValues();

    console.log('Selected Transitions:', this.selectedTransitions);
  }

  onEventSelected(event: any): void {
    console.log('onEventSelected')
    const value = event.target?.value;
    if (value) {
      this.selectedEvent = value;
      this.eventSelected = event.target.value !== 'Choose...';
    }
  }

  onBreakingAction(BreakingAction: any): void {
    const value = BreakingAction.target?.value;
    if (value) {
      this.selectedBreakingAction = value;
      this.breakingActionSelected = value !== 'Choose...';
    }
  }
  selectedOption: string = ''; // Variable to store the selected option from the dropdown

  onNonBreakingAction(selectedValue: string): void {

    this.selectedOption = selectedValue;
  }


  onendState(onendState: any): void {
    const value = onendState.target?.value;
    if (value) {
      this.selectedEndState = value;
      this.endStateSelected = value !== 'Choose...';
    }
  }

  private clearSelectedValues(): void {
    console.log('clearSelectedValues')
    this.selectedStartState = '';
    this.selectedEvent = '';
    this.selectedEndState = '';
    this.selectedBreakingAction = '';
    this.selectedNonBreakingAction = '';
  }

  updateSuccessMessage: string = '';

  onUpdateClick(transition: any, index: number) {
    this.cdr.detectChanges();
    this.onCloseModel();
    this.updateSuccessMessage = 'Update successful!';
  }

  getUniqueEndStates(): { stateName: string, stateCode: string, nextEvent: string | null }[] {
    const uniqueStates: { stateName: string, stateCode: string, nextEvent: string | null }[] = [];

    // Loop through sample1 and sample2 arrays to gather unique end states
    [...WorflowSample.sample1].forEach(item => {
      if (item.endStateOne) {
        uniqueStates.push({
          stateName: item.endStateOne.stateName,
          stateCode: item.endStateOne.stateCode,
          nextEvent: item.endStateOne.nextEvent
        });
      }
    });

    return uniqueStates;
  }
  tableData: string[] = [];
  addToTable(): void {
    // Add the selected option to the table input only if an option is selected
    if (this.selectedOption) {
      // Push the selected option to the selectedTransitions array
      this.selectedTransitions.push({ ActionName: this.selectedOption });
      // Clear the selected option
      this.selectedOption = '';
    }
  }

  showForm = true;

  transitionsData = WorflowSample.sample1;

  stateMachineForm = this.formBuilder.group({
    transitions: JSON.stringify(WorflowSample.sample1),
  });

  workflowData: any;
  WorflowSample: any;
  JSON: any;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.workflowData = WorflowSample.sample2;

  }
  formData: any = {};

  handleClick() {
    this.showData = true;
  }


  ngOnInit(): void {

    this.creationForm = this.fb.group({
      item: ['', Validators.required]
    })
    const localData = localStorage.getItem("iremboWorkflow");
    if (localData != null) {
      this.newTransitionsList = JSON.parse(localData)
    }
    this.initialiseCreationFormGroup();

  }

  sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  @ViewChildren(StateComponent)
  stateComponents!: QueryList<StateComponent>;

  @ViewChildren(TransitionNewComponent)
  transitionComponents!: QueryList<TransitionNewComponent>;

  @Input()
  iremboWorkflow: IremboTransition[] = [];

  // keep the list of link that will be draw in the diagram
  _drawedLink: any[] = [];

  // local representation of the workflow
  workflow: Workflow = {
    states: new Map(),
    transitions: []
  };

  ngAfterViewInit(): void {

    // build workflow from iremboWorkflow
    this.buildWorkflow();

    // draw the Diagram
    setTimeout(() => this.drawWorkflowDiagram());
  }

  onDragMove(move: CdkDragMove<string>) {
    this._drawedLink.forEach(element => {
      element.position();
    });

    console.log("onDragMove workflow", this.workflow);
  }

  onSubmit() {
    console.log('transitions', this.stateMachineForm.value);

  }

  buildWorkflow() {

    const patX = 120;
    const patY = 120;

    let currentX = 270;
    let currentY = -600;

    let i = 1;

    this.iremboWorkflow.forEach(element => {

      i = i + 1;

      // get or set the position of the transition
      if (element.position) {
        currentX = element.position.x;
        currentY = element.position.y;
      } else {
        element.position = {
          x: currentX,
          y: currentY
        }
      }

      // Add Start State :  If the start state not yet added, please add it 
      if (!this.workflow.states.has(element.startState.toString())) {
        let state: stateConfig = {
          name: element.startState.toString(),
          names: element.startState.toString(),
          position: {
            x: element.position.x,
            y: element.position.y - patY
          }
        }

        this.workflow.states.set(element.startState.toString(), state);
      }

      // Add End State One : If the EndStateOne not yet added, please add it 
      if (element.endStateOne && !this.workflow.states.has(element.endStateOne?.stateCode.toString())) {
        let stateposition = element.endStateOne.position;
        if (!stateposition) {
          stateposition = {
            x: element.position.x + 2 * patX,
            y: element.position.y - patY
          }
        }

        let state: stateConfig = {
          name: element.endStateOne.stateCode.toString(),
          names: element.endStateOne.stateCode.toString(),
          position: stateposition
        }

        this.workflow.states.set(element.endStateOne.stateCode.toString(), state);
      }

      // Add End State Two : If the EndStateTwo not yet added, please add it 
      if (element.endStateTwo && !this.workflow.states.has(element.endStateTwo?.stateCode.toString())) {

        let stateposition = element.endStateTwo.position;
        if (!stateposition) {
          stateposition = {
            x: element.position.x + 2 * patX,
            y: element.position.y + patY
          }
        }

        let state: stateConfig = {
          name: element.endStateTwo.stateCode.toString(),
          names: element.endStateTwo.stateCode.toString(),
          position: stateposition

        }

        this.workflow.states.set(element.endStateTwo.stateCode.toString(), state);
      }

      // Add The transition
      if (element.endStateOne) {
        let transition: transitionConfig = {
          name: element.event.toString(),
          names: element.event.toString(),
          description: element.event.toString(),
          startState: element.startState.toString(),
          endStateOne: element.endStateOne,
          endStateTwo: element.endStateTwo,
          position: element.position
        }
        this.workflow.transitions.push(transition);
        // createNewTransitions(){

        // }
      }

      currentX = element.position.x + 2 * patX;
      currentY = element.position.y;
    });
  }

  getStateComponentbyName(name: string): StateComponent | undefined {
    let compo = this.stateComponents.find(element => element.config.name === name);
    return compo;
  }


  drawWorkflowDiagram() {

    console.log("drawWorkflowDiagram workflow, before", this.workflow);
    console.log("Transitions", this.transitionComponents);
    console.log("states", this.stateComponents);

    let defaultPath = 'fluid'; // straight , arc, fluid, magnet, grid
    let defaultColor = 'black';
    let defaultStartPlugSize = 3;
    let defaultStartPlug = 'disc'; // square, arrow1, arrow2, arrow3, hand, crosshair, behind

    this.transitionComponents.forEach(element => {

      // Draw link from start state
      this._drawedLink.push(new LeaderLine(
        this.getStateComponentbyName(element.config.startState)?.el.nativeElement,
        element.el.nativeElement,
        {
          path: defaultPath,
          startSocket: 'auto',
          endSocket: 'auto',
          startPlug: defaultStartPlug,
          startPlugSize: defaultStartPlugSize,
          endPlug: 'arrow1',
          color: defaultColor,
          dash: { animation: true },
          size: 2
        }
      ));

      // Draw link to EndState One
      if (element.config.endStateOne) {
        this._drawedLink.push(new LeaderLine(
          element.endStateOne.nativeElement,
          this.getStateComponentbyName(element.config.endStateOne.stateCode)?.el.nativeElement,
          {
            path: defaultPath,
            startSocket: 'auto',
            endSocket: 'auto',
            startPlug: defaultStartPlug,
            startPlugSize: defaultStartPlugSize,
            endPlug: 'arrow1',
            color: defaultColor,
            dash: { animation: true },
            size: 2
          }
        ));
      }

      // Draw link to EndState Two
      if (element.config.endStateTwo) {
        this._drawedLink.push(new LeaderLine(
          element.endStateTwo.nativeElement,
          this.getStateComponentbyName(element.config.endStateTwo.stateCode)?.el.nativeElement,
          {
            path: defaultPath,
            startSocket: 'auto',
            endSocket: 'auto',
            startPlug: defaultStartPlug,
            startPlugSize: defaultStartPlugSize,
            endPlug: 'arrow1',
            color: defaultColor,
            dash: { animation: true },
            size: 2
          }
        ));
      }

    });

    console.log("drawedLink", this._drawedLink);

  }

  handleTransitionSelect(selected: transitionConfig) {
    this.transitionToEdit = selected
  }

  initialiseCreationFormGroup() {
    this.creationForm.addControl('startState', new FormControl('', Validators.required));
    this.creationForm.addControl('event', new FormControl('', Validators.required))
  }

  onCloseModel() {
    const formElement = document.getElementById('transitionModel');
    if (formElement) {
      formElement.style.display = 'none'; // or formElement.style.visibility = 'hidden';
    }
  }

  createNewTransition() {
    const isLocalPresent = localStorage.getItem("iremboWorkflow");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      oldArray.push(this.newTransitionsObj);
      localStorage.setItem('iremboWorkflow', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.newTransitionsObj);
      localStorage.setItem('iremboWorkflow', JSON.stringify(newArr));
    }

  }
}

export class createNewTransitions {
  id = crypto.randomUUID();
  startState: string;
  event: string;
  state: string;
  breakingAction: string;
  nonBreakingAction: string;

  constructor() { this.startState = ''; this.event = ''; this.state = ''; this.breakingAction = ''; this.nonBreakingAction = '' }
}

 // changeWorkflow() {
  //   this.workflow = {
  //     states : [
  //       {
  //         name : "START",
  //         position : {
  //           x : 100,
  //           y : 100
  //         }
  //       },
  //       {
  //         name : "TODO",
  //         position : {
  //           x : 100,
  //           y : 200
  //         }
  //       },
  //       {
  //         name : "IN_PROGRESS",
  //         position : {
  //           x : 100,
  //           y : 300
  //         }
  //       },
  //       {
  //         name : "DONE",
  //         position : {
  //           x : 100,
  //           y : 400
  //         }
  //       }
  //     ],
  //     transitions : [
  //       {
  //         name : "CREATE",
  //         startState : "START",
  //         endState : "TODO",
  //         position : {
  //           x : 500,
  //           y : 100
  //         }
  //       },
  //       {
  //         name : "In Development",
  //         startState : "TODO",
  //         endState : "IN_PROGRESS",
  //         position : {
  //           x : 500,
  //           y : 200
  //         }
  //       },
  //       {
  //         name : "Finish",
  //         startState : "IN_PROGRESS",
  //         endState : "DONE",
  //         position : {
  //           x : 500,
  //           y : 400
  //         }
  //       }
  //       // ,
  //       // {
  //       //   name : "TOUssaint",
  //       //   startState : "START",
  //       //   endState : "DONE",
  //       //   position : {
  //       //     x : 500,
  //       //     y : 400
  //       //   }
  //       // }
  //     ]
  //   }
  // }

  // reorderDiagram() {
  //   let initX = 100;
  //   let initY = 400;

  //   let pasX = 130;
  //   let pasY = 130;



  //   let currentX = 50;
  //   let currentY = 50;

  //   let currentNode = new Map();

  //   this.workflow.transitions.forEach(element => {

  //     if(!currentNode.has(element.startState)){
  //       let node = this.workflow.states.find(elt => elt.name === element.startState);
  //       if(node) {
  //         node!.position.x = currentX;
  //         node!.position.y = currentY;
  //         currentX = currentX;
  //         currentY = currentY + pasY;
  //         currentNode.set(element.startState,node)
  //       }
  //     } else {
  //       let node = this.workflow.states.find(elt => elt.name === element.startState);
  //       if(node) {
  //         currentX = node?.position.x;
  //         currentY = node?.position.y + pasY;
  //       }
  //     }

  //     element.position.x = currentX;
  //     element.position.y = currentY;

  //     if(!currentNode.has(element.endState)){
  //       let node = this.workflow.states.find(elt => elt.name === element.endState);
  //       if(node) {
  //         node!.position.x = currentX + 2*pasX;
  //         node!.position.y = currentY;
  //         currentX = currentX + pasX;
  //         currentNode.set(element.endState,node)
  //       }
  //     }
  //   });

  //   console.log("reorderDiagram, after", this.workflow);
  // }
