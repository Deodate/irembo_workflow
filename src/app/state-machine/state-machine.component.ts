import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StateComponent } from './state/state.component';
import { TransitionNewComponent } from './transition/transition.component';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { map } from 'rxjs';
import { IremboTransition, Workflow, stateConfig, transitionConfig } from './models';

declare var LeaderLine : any;

@Component({
  selector: 'app-state-machine',
  templateUrl: './state-machine.component.html',
  styleUrls: ['./state-machine.component.css']
})
export class StateMachineComponent implements OnInit , AfterViewInit  {

  @ViewChildren(StateComponent)
  stateComponents!: QueryList<StateComponent>;

  @ViewChildren(TransitionNewComponent)
  transitionComponents!: QueryList<TransitionNewComponent>;

  @Input()
  iremboWorkflow: IremboTransition[] = [];

  // keep the list of link that will be draw in the diagram
  _drawedLink : any[] = [];

  // local representation of the workflow
  workflow : Workflow = {
    states: new Map(),
    transitions: []
  } ;
  
  
  constructor() { }

  ngAfterViewInit(): void {

    // build workflow from iremboWorkflow
    this.buildWorkflow();

    // draw the Diagram
    setTimeout(() => this.drawWorkflowDiagram());
  }

  ngOnInit(): void {
    // this.changeWorkflow();
    // this.reorderDiagram();   
  }

  onDragMove(move: CdkDragMove<string>) {
    this._drawedLink.forEach(element => {
      element.position();      
    });

    console.log("onDragMove workflow", this.workflow); 
  }


  buildWorkflow () {
    const patX = 150;
    const patY = 150;

    let currentX = 50;
    let currentY = 200;

    let i = 1;

    this.iremboWorkflow.forEach(element => {

      i = i + 1;

      // get or set the position of the transition
      if(element.position) {
        currentX = element.position.x;
        currentY = element.position.y;
      } else {
        element.position = {
          x : currentX,
          y : currentY
        }
      }

      // Add Start State :  If the start state not yet added, please add it 
      if(!this.workflow.states.has(element.startState.toString())) {
        let state : stateConfig = {
          name : element.startState.toString(),
          position : {
            x: element.position.x,
            y: element.position.y - patY
          }
        } 

        this.workflow.states.set(element.startState.toString(), state);
      }

      // Add End State One : If the EndStateOne not yet added, please add it 
      if(element.endStateOne && !this.workflow.states.has(element.endStateOne?.stateCode.toString())) {
        let stateposition = element.endStateOne.position;
        if(!stateposition) {
          stateposition = {
            x: element.position.x + 2*patX,
            y: element.position.y - patY
          }
        }

        let state : stateConfig = {
          name : element.endStateOne.stateCode.toString(),
          position : stateposition
        } 

        this.workflow.states.set(element.endStateOne.stateCode.toString(), state);
      }

      // Add End State Two : If the EndStateTwo not yet added, please add it 
      if(element.endStateTwo && !this.workflow.states.has(element.endStateTwo?.stateCode.toString())) {

        let stateposition = element.endStateTwo.position;
        if(!stateposition) {
          stateposition = {
            x: element.position.x + 2*patX,
            y: element.position.y + patY
          }
        }

        let state : stateConfig = {
          name : element.endStateTwo.stateCode.toString(),
          position : stateposition
          
        } 

        this.workflow.states.set(element.endStateTwo.stateCode.toString(), state);
      }
      
      // Add The transition
      if (element.endStateOne) {
        let transition : transitionConfig = {
          name : element.event.toString(),
          startState : element.startState.toString(),
          endStateOne : element.endStateOne,
          endStateTwo : element.endStateTwo,
          position : element.position

        }
        this.workflow.transitions.push(transition);
      }  
      
      currentX = element.position.x + 2*patX;
      currentY = element.position.y;
    });
  }

  getStateComponentbyName(name : string) : StateComponent | undefined{
    let compo = this.stateComponents.find(element => element.config.name === name);
    return compo ;
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

  drawWorkflowDiagram() {

    console.log("drawWorkflowDiagram workflow, before", this.workflow); 
    console.log ("Transitions", this.transitionComponents);
    console.log ("states", this.stateComponents);

    let defaultPath = 'fluid'; // straight , arc, fluid, magnet, grid
    let defaultColor = 'grey';
    let defaultStartPlugSize = 3;
    let defaultStartPlug = 'disc'; // square, arrow1, arrow2, arrow3, hand, crosshair, behind

    this.transitionComponents.forEach(element => {

      // Draw link from start state
      this._drawedLink.push(new LeaderLine(
        this.getStateComponentbyName(element.config.startState)?.el.nativeElement,
        element.el.nativeElement,
        {
           path : defaultPath,
           startSocket : 'auto',
           endSocket : 'auto',
           startPlug: defaultStartPlug,
           startPlugSize: defaultStartPlugSize,
           endPlug: 'arrow1',
           color : defaultColor,
           dash: {animation: true},
           size: 2
         }
      ));

      // Draw link to EndState One
      if(element.config.endStateOne) {
        this._drawedLink.push(new LeaderLine(
          element.endStateOne.nativeElement,
          this.getStateComponentbyName(element.config.endStateOne.stateCode)?.el.nativeElement,
          {
            path : defaultPath,
            startSocket : 'auto',
            endSocket : 'auto',
            startPlug: defaultStartPlug,
            startPlugSize: defaultStartPlugSize,
            endPlug: 'arrow1',
            color : defaultColor,
            dash: {animation: true},
            size: 2
          }
        ));
      }

      // Draw link to EndState Two
      if(element.config.endStateTwo) {
        this._drawedLink.push(new LeaderLine(
          element.endStateTwo.nativeElement,
          this.getStateComponentbyName(element.config.endStateTwo.stateCode)?.el.nativeElement,
          {
            path : defaultPath,
            startSocket : 'auto',
            endSocket : 'auto',
            startPlug: defaultStartPlug,
            startPlugSize: defaultStartPlugSize,
            endPlug: 'arrow1',
            color : defaultColor,
            dash: {animation: true},
            size: 2
          }
        ));
      }
      
    });

    console.log ("drawedLink", this._drawedLink);

    
  }
}
