import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StateComponent } from './state/state.component';
import { TransitionNewComponent } from './transition/transition.component';
import { CdkDragMove } from '@angular/cdk/drag-drop';

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

  drawedLink : any[] = [];

  workflow = {
    states : [
      {
        name : "START",
        position : {
          x : 100,
          y : 100 
        }        
      },
      {
        name : "TODO",
        position : {
          x : 100,
          y : 200 
        } 
      },
      {
        name : "IN_PROGRESS",
        position : {
          x : 100,
          y : 300 
        } 
      },
      {
        name : "DONE",
        position : {
          x : 100,
          y : 400 
        } 
      }
    ],
    transitions : [
      {
        name : "CREATE",
        startState : "START",
        endState : "TODO",
        position : {
          x : 500,
          y : 100 
        }  
      },
      {
        name : "In Development",
        startState : "TODO",
        endState : "IN_PROGRESS",
        position : {
          x : 500,
          y : 200 
        } 
      },
      {
        name : "Finish",
        startState : "IN_PROGRESS",
        endState : "DONE",
        position : {
          x : 500,
          y : 400 
        } 
      },
      {
        name : "TOUssaint",
        startState : "START",
        endState : "DONE",
        position : {
          x : 500,
          y : 400 
        } 
      }
    ]
  }
  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => this.createLineForTransitions());
  }

  ngOnInit(): void {

    

  }

  onDragMove(move: CdkDragMove<string>) {
    this.drawedLink.forEach(element => {
      element.position();      
    });
  }



  getStateComponentbyName(name : string) : StateComponent | undefined{
    let compo = this.stateComponents.find(element => element.config.name === name);
    return compo ;
  }

  createLineForTransitions() {

    console.log ("Transitions", this.transitionComponents);
    console.log ("states", this.stateComponents);



    this.transitionComponents.forEach(element => {

      this.drawedLink.push(new LeaderLine(
        // this.getStateComponentbyName(element.config.startState)?.outputSlot?.port?.nativeElement, 
        // element.inputSlot?.port?.nativeElement,
        this.getStateComponentbyName(element.config.startState)?.el.nativeElement,
        element.el.nativeElement,
        {
           path : 'grid',
           startSocket : 'auto',
           endSocket : 'auto',
           startPlug: 'square',
           endPlug: 'arrow1',
           color : 'coral'
         }
      ));

      this.drawedLink.push(new LeaderLine(
        element.el.nativeElement,
        this.getStateComponentbyName(element.config.endState)?.el.nativeElement,
        {
          path : 'grid',
          startSocket : 'auto',
          endSocket : 'auto',
          startPlug: 'square',
          endPlug: 'arrow1',
          color : 'coral'
        }
        // {
        //   startPlug: 'behind',
        //   endPlug: 'behind',
        //   color : '#000000'
        // }  

      ));
    });

    console.log ("drawedLink", this.drawedLink);
  }
}
